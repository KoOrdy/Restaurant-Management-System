using Microsoft.EntityFrameworkCore;
using resturantApi.Models;
using resturantApi.Dtos.Restaurant;
using resturantApi.Interfaces;
using resturantApi.Mappers;
using resturantApi.Data;
using resturantApi.SMTP;
using resturantApi.PasswordGenerate;


namespace resturantApi.Repository
{
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly ApplicationDBContext _context;

        public RestaurantRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<RestaurantDto>> GetAllRestaurantsAsync()
        {
            return await _context.Restaurants
                .Where(r => r.Status == "Approved")
                .Select(r => new RestaurantDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description,
                    Location = r.Location,
                    ImageUrl = r.ImageUrl,
                })
                .ToListAsync();
        }

        public async Task<RestaurantDetailsDto> GetRestaurantByIdAsync(int restaurantId)
        {
            var restaurantExists = await _context.Restaurants.AnyAsync(r => r.Id == restaurantId);
            if (!restaurantExists)
            {
                return null; 
            }
            
            var restaurantData = await _context.FoodCategories
                .Include(c => c.MenuItems.Where(m => m.RestaurantId == restaurantId))
                .Select(c => new CategoryWithMenuDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    MenuItems = c.MenuItems
                        .Where(MI => MI.RestaurantId == restaurantId)
                        .Select(MI => new MenuItemDto
                        {
                            Id = MI.Id,
                            Name = MI.Name,
                            Description = MI.Description,
                            Price = MI.Price,
                            Availability = MI.Availability ? 1 : 0,
                            ImageUrl = MI.ImageUrl
                        }).ToList()
                })
                .Where(c => c.MenuItems.Any()) // Only include categories with menu items
                .ToListAsync();

            return new RestaurantDetailsDto
            {
                Categories = restaurantData
            };              
        }

        public async Task<List<RestaurantManagerDto>> GetRestaurantDataByIDAsync()
        {
            var restaurant = await _context.Restaurants
                .Where(r => r.Status == "Approved")
                .Select(r => new RestaurantManagerDto
                {
                    RestaurantName = r.Name,
                    ManagerId = r.ManagerId ?? 0,
                    ManagerName = r.ManagerName,
                    ImageUrl = r.ImageUrl
                })
                .ToListAsync();

            if (restaurant == null)
            {
                return null; 
            }

            return restaurant;
        }


        public async Task<bool> EmailMangerExist(string Email)
        {
            return await _context.Restaurants.AnyAsync(u => u.ManagerEmail == Email);
        }

        public async Task<List<Restaurant>> GetAllResturantAsyncAdmin()
        {
            return await _context.Restaurants.ToListAsync();
        }
        public async Task<Restaurant> GetResturantByIdAsyncAdmin(int restaurantId)
        {
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(x => x.Id == restaurantId);
            if(restaurant == null)
            {
                return null;
            }
            return restaurant;
        }

        public async Task<Restaurant?> CreateRestaurantAsync(User managerModel, RestaurantCreateDto createDto)
        {
            await _context.Users.AddAsync(managerModel);
            await _context.SaveChangesAsync();

            var restaurantModel = createDto.ToCreateResturantFromDto(managerModel.Id);

            await _context.Restaurants.AddAsync(restaurantModel);
            await _context.SaveChangesAsync();

            return restaurantModel;
        }

        public async Task<Restaurant?> UpdateRestaurantAsync(RestaurantUpdateDto requestDto, int restaurantId)
        {
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(x => x.Id == restaurantId);
            if (restaurant == null)
            {
                return null;
            }

            if (!string.IsNullOrEmpty(requestDto.Name))
                restaurant.Name = requestDto.Name;

            if (!string.IsNullOrEmpty(requestDto.Description))
                restaurant.Description = requestDto.Description;

            if (!string.IsNullOrEmpty(requestDto.Location))
                restaurant.Location = requestDto.Location;

            if (!string.IsNullOrEmpty(requestDto.ImageUrl))
                restaurant.ImageUrl = requestDto.ImageUrl;

            await _context.SaveChangesAsync();
            return restaurant;
        }

        public async Task<bool> DeleteRestaurantAsync(int restaurantId)
        {
            var restaurant = await _context.Restaurants.FindAsync(restaurantId);
            if (restaurant == null)
            {
                return false;
            }

            var user = await _context.Users.FindAsync(restaurant.ManagerId);

            _context.Restaurants.Remove(restaurant);

            if (user != null)
            {
                _context.Users.Remove(user);
            }

            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<(bool Success, string Message)> ApproveRestaurantAsync(int restaurantId)
        {
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.Id == restaurantId);

            if (restaurant == null)
                return (false, "Restaurant not found.");

            if (restaurant.Status == "Approved")
                return (false, "Restaurant is already approved.");

            if (string.IsNullOrEmpty(restaurant.ManagerEmail) || string.IsNullOrEmpty(restaurant.ManagerName))
                return (false, "Manager information is missing.");

            var randomPassword = PasswordGenerator.GenerateRandomPassword();
            var manager = ManagerMapper.CreateManager(restaurant.ManagerName, restaurant.ManagerEmail, randomPassword);

            _context.Users.Add(manager);
            await _context.SaveChangesAsync();

            restaurant.ManagerId = manager.Id;
            restaurant.Status = "Approved";

            _context.Restaurants.Update(restaurant);
            await _context.SaveChangesAsync();

            var emailBody = $"Hello {manager.Name},\n\nYour restaurant has been approved!\nYour login credentials are:\nEmail: {manager.Email}\nPassword: {randomPassword}\n\nPlease change your password after your first login.";

            Mailer.SendEmail(manager.Email, "Restaurant Approved - Account Created", emailBody);

            return (true, "Restaurant approved and manager account created.");
        }

        public async Task<(bool Success, string Message)> RejectRestaurantAsync(int restaurantId)
        {
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(x => x.Id == restaurantId);

            if (restaurant == null)
                return (false, "Restaurant not found.");

            if (restaurant.Status == "Approved")
                return (false, "Restaurant is already approved.");

            if (restaurant.Status == "Rejected")
                return (false, "Restaurant is already rejected.");

            if (string.IsNullOrEmpty(restaurant.ManagerEmail) || string.IsNullOrEmpty(restaurant.ManagerName))
                return (false, "Manager information is missing.");

            restaurant.Status = "Rejected";
            await _context.SaveChangesAsync();

            return (true, "Restaurant rejected successfully.");
        }

        public async Task<bool> UpdateRestaurantImageAsync(Restaurant restaurant)
        {
            _context.Restaurants.Update(restaurant);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

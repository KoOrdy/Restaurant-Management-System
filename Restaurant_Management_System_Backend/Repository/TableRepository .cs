using Microsoft.EntityFrameworkCore;
using resturantApi.Data;
using resturantApi.Dtos.Table;
using resturantApi.Interfaces;
using resturantApi.Mappers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace resturantApi.Repository
{
    public class TableRepository :ITableRepository
    {
        private readonly ApplicationDBContext _context;

        public TableRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TableDto>> GetTablesByRestaurantIdAsync(int restaurantId)
        {
            var tables = await _context.Tables
                .Where(t => t.RestaurantId == restaurantId)
                .ToListAsync();

            return tables.Select(t => t.ToTableDto());
        }

        public async Task<IEnumerable<TableDto>> GetTablesByManagerIdAsync(int managerId)
        {
            var restaurant = await _context.Restaurants
                .FirstOrDefaultAsync(r => r.ManagerId == managerId);

            if (restaurant == null)
                return Enumerable.Empty<TableDto>();

            var tables = await _context.Tables
                .Where(t => t.RestaurantId == restaurant.Id)
                .ToListAsync();

            return tables.Select(t => t.ToTableDto());
        }

        public async Task<TableDto?> CreateTableAsync(int managerId, TableRequestDto tableRequestDto)
        {
            var restaurant = await _context.Restaurants
                .FirstOrDefaultAsync(r => r.ManagerId == managerId);

            if (restaurant == null)
                return null;

            var exists = await _context.Tables
                .AnyAsync(t => t.RestaurantId == restaurant.Id && t.TableName.ToLower() == tableRequestDto.TableName.ToLower());

            if (exists)
                return null;

            var table = tableRequestDto.ToTableFromDto(restaurant.Id);

            await _context.Tables.AddAsync(table);
            await _context.SaveChangesAsync();

            return table.ToTableDto();
        }

        public async Task<bool> DeleteTableAsync(int managerId, int tableId)
        {
            var restaurant = await _context.Restaurants
                .FirstOrDefaultAsync(r => r.ManagerId == managerId);

            if (restaurant == null)
                return false;

            var table = await _context.Tables
                .FirstOrDefaultAsync(t => t.Id == tableId && t.RestaurantId == restaurant.Id);

            if (table == null)
                return false;

            _context.Tables.Remove(table);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
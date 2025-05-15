using System;
using Microsoft.EntityFrameworkCore;
using resturantApi.Models;

namespace resturantApi.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<FoodCategory> FoodCategories { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Messages> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configurations
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .Property(u => u.Name)
                .HasMaxLength(100)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .HasMaxLength(100)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .HasMaxLength(100)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasMaxLength(20)
                .IsRequired();

            // MenuItem configurations
            modelBuilder.Entity<MenuItem>()
                .Property(m => m.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<MenuItem>()
                .Property(r => r.ImageUrl)
                .HasMaxLength(500); // Configure ImageUrl

            // Restaurant configurations
            modelBuilder.Entity<Restaurant>()
                .HasOne(r => r.Manager)
                .WithMany()
                .HasForeignKey(r => r.ManagerId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Restaurant>()
                .Property(r => r.ImageUrl)
                .HasMaxLength(500); // Configure ImageUrl

            // Reservation configurations
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Customer)
                .WithMany()
                .HasForeignKey(r => r.CustomerId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Restaurant)
                .WithMany(r => r.Reservations)
                .HasForeignKey(r => r.RestaurantId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Table)
                .WithMany(t => t.Reservations)
                .HasForeignKey(r => r.TableId)
                .OnDelete(DeleteBehavior.SetNull);

            // Order configurations
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany()
                .HasForeignKey(o => o.CustomerId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Restaurant)
                .WithMany(r => r.Orders)
                .HasForeignKey(o => o.RestaurantId)
                .OnDelete(DeleteBehavior.SetNull);

            // OrderItem configurations
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.MenuItem)
                .WithMany(mi => mi.OrderItems)
                .HasForeignKey(oi => oi.MenuItemId)
                .OnDelete(DeleteBehavior.SetNull);

            // MenuItem configurations
            modelBuilder.Entity<MenuItem>()
                .HasOne(mi => mi.Restaurant)
                .WithMany(r => r.MenuItems)
                .HasForeignKey(mi => mi.RestaurantId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<MenuItem>()
                .HasOne(mi => mi.Category)
                .WithMany(c => c.MenuItems)
                .HasForeignKey(mi => mi.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            // Review configurations
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Customer)
                .WithMany()
                .HasForeignKey(r => r.CustomerId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Restaurant)
                .WithMany(r => r.Reviews)
                .HasForeignKey(r => r.RestaurantId)
                .OnDelete(DeleteBehavior.SetNull);

            // Table configurations
            modelBuilder.Entity<Table>()
                .HasOne(t => t.Restaurant)
                .WithMany(r => r.Tables)
                .HasForeignKey(t => t.RestaurantId)
                .OnDelete(DeleteBehavior.SetNull);

            // Seed static number of tables per restaurant
            modelBuilder.Entity<Restaurant>()
                .HasMany(r => r.Tables)
                .WithOne(t => t.Restaurant)
                .OnDelete(DeleteBehavior.SetNull);

            // Messages configurations
            modelBuilder.Entity<Messages>()
                .HasOne(m => m.Sender)
                .WithMany(u => u.SentMessages)
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Messages>()
                .HasOne(m => m.Receiver)
                .WithMany(u => u.ReceivedMessages)
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Messages>()
                .Property(m => m.Content)
                .HasMaxLength(2000)
                .IsRequired();

            modelBuilder.Entity<Messages>()
                .Property(m => m.Timestamp)
                .IsRequired();

            modelBuilder.Entity<Messages>()
                .Property(m => m.IsRead)
                .IsRequired();

            modelBuilder.Entity<Messages>()
                .HasIndex(m => new { m.SenderId, m.ReceiverId, m.Timestamp }); // Index for performance
        }
    }
}
            // Example: Each restaurant gets 15 tables by default
            // modelBuilder.Entity<Restaurant>().HasData(
            //     new Restaurant
            //     {
            //         Id = 1,
            //         Name = "Sample Restaurant",
            //         ManagerId = null,
            //         ManagerName = "John Doe",
            //         ManagerEmail = "john@example.com",
            //         Status = "Pending",
            //         ImageUrl = "https://example.com/images/sample-restaurant.jpg" // Example image URL
            //     }
            // );

            // modelBuilder.Entity<Table>().HasData(
            //     Enumerable.Range(1, 15).Select(i => new Table
            //     {
            //         Id = i,
            //         RestaurantId = 1,
            //         Capacity = 5
            //     }).ToArray()
            // );
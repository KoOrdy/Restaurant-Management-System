using resturantApi.Dtos.Table;
using resturantApi.Models;

namespace resturantApi.Interfaces
{
    public interface ITableRepository
    {
         Task<IEnumerable<TableDto>> GetTablesByRestaurantIdAsync(int restaurantId);
        Task<IEnumerable<TableDto>> GetTablesByManagerIdAsync(int managerId);
        Task<TableDto?> CreateTableAsync(int managerId, TableRequestDto tableRequestDto);
        Task<bool> DeleteTableAsync(int managerId, int tableId);
    }
}
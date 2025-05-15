using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Table;
using resturantApi.Models;

namespace resturantApi.Mappers
{
    public static class TableMapper
    {
        public static TableDto ToTableDto(this Table table)
        {
            return new TableDto 
            {
                Id=table.Id,
                Capacity=table.Capacity,
                TableName=table.TableName
            };
        }

        public static Table ToTableFromDto(this TableRequestDto requestDto , int restaurantId)
        {
            return new Table
            {
                TableName=requestDto.TableName,
                Capacity=requestDto.Capacity,
                RestaurantId=restaurantId
            };
        }
    }

}


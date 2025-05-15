using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Reservation;
using resturantApi.Models;
namespace resturantApi.Mappers
{
    public static class ReservationMapper
    {
        public static Reservation ToReservationFromDto(this ReservationRequestDto dto , int CustomerId , int RestaurantId)
        {
            return new Reservation
            {
                CustomerId = CustomerId,
                RestaurantId = RestaurantId,
                TableId = dto.TableId,
                ReservationDate = dto.ReservationDate,
                StartTime = dto.StartTime,
                NumberOfGuests = 0
            };
        }

        public static ReservationDto ToDtoFromReservation(this Reservation reservation)
        {
            return new ReservationDto
            {
                Id = reservation.Id,
                CustomerId = reservation.CustomerId ?? 0,
                RestaurantId = reservation.RestaurantId ?? 0,
                TableId = reservation.TableId ?? 0,
                // TableName = reservation.Table?.TableName,
                // RestaurantName = reservation.Restaurant?.Name,
                ReservationDate = reservation.ReservationDate,
                StartTime = reservation.StartTime,
                EndTime = reservation.EndTime,
                // NumberOfGuests = reservation.NumberOfGuests,
                Status = reservation.Status
            };
        }


    }
}
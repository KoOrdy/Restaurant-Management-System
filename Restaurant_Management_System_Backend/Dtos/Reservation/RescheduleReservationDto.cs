using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;

namespace resturantApi.Dtos.Reservation
{
    public class RescheduleReservationDto
    {
        public DateTime NewReservationDate { get; set; }
        public TimeSpan NewStartTime { get; set; }
    }
}
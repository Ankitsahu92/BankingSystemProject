using BankingSystem.Model.Model.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.RequestModel
{
    public class DeleteUserRequest 
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int? ModifiedBy { get; set; }
        [Required]
        public DateTime? ModifiedOn { get; set; }
        [Required]
        public string? ModifiedByIP { get; set; }
    }
}

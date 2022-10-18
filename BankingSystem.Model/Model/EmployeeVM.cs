using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.Model
{
    public class EmployeeVM
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string? Name { get; set; }
        [MaxLength(100)]
        public string? Email { get; set; }
        [Required]
        [MaxLength(15)]
        public string? Mobile { get; set; }

        // [JsonIgnore]
        public string? Gender { get; set; }
        public DateTime DOB { get; set; }
        public bool IsActive { get; set; }
        public string? Range { get; set; }
        public string? UserType { get; set; }
    }
}
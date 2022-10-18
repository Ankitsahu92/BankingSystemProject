using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.Model.Common
{
    public class BaseClassVM
    {
        [Required]
        public int CreatedBy { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string? CreatedByIP { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedByIP { get; set; }
        public bool isActive { get; set; } = true;
    }
}


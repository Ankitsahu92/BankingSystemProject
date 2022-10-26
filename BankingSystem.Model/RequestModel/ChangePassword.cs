using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.RequestModel
{
    public class ChangePassword
    {
        [Required]
        public int UserID { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}

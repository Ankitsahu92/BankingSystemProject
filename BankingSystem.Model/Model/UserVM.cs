using BankingSystem.Model.Model.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.Model
{
    public class UserVM : BaseClassVM
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string? FirstName { get; set; }
        [MaxLength(50)]
        public string? LastName { get; set; }
        [MaxLength(50)]
        public string? UserName { get; set; }

        [MaxLength(20)]
        public string? AccountNo { get; set; }

        [MaxLength(50)]
        public string? AccountType { get; set; }

        // [JsonIgnore]
        public string? Password { get; set; }

        public bool isAdmin { get; set; } = false;

        public bool MakeCheckbookRequest { get; set; } = false;
    }
}

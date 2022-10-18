using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.RequestModel
{
    public class AuthenticateRequest
    {
        [Required]
        [DefaultValue("8978786933")]
        public string? Username { get; set; }

        [Required]
        [DefaultValue("System@1234")]
        public string? Password { get; set; }
    }
}

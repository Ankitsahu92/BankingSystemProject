using BankingSystem.Model.Model.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.RequestModel
{
    public class FundTransferRequestModel: BaseClassVM
    {
        [Required]
        public string? FromAccount { get; set; }
        [Required]
        public string? ToAccount { get; set; }
        [Required]
        public double Amount { get; set; }

        public string Description { get; set; } = "";
    }
}

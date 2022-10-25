using BankingSystem.Model.Model.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.Model
{
    public class AccountsVM : BaseClassVM
    {
        public int ID { get; set; }

        [Required]
        public int UserId { get; set; }
        [Required]
        public double Amount { get; set; }
        public double OldBalance { get; set; }
        public double NewBalance { get; set; }
        [Required]
        [MaxLength(500)]
        public string? Description { get; set; }
        [Required]
        [MaxLength(50)]
        public string? TransactionType { get; set; }// Cr & Dr
        [Required]
        public bool isChequeTransaction { get; set; } = false;
        [MaxLength(200)]
        public string? ChequeAndRefNo { get; set; }
        public DateTime TransactionDate { get; set; }
        
    }
}

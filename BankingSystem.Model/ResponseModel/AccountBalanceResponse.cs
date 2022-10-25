using BankingSystem.Model.EntityModel;
using BankingSystem.Model.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.ResponseModel
{
    public class AccountBalanceResponse
    {
        public AccountBalanceResponse(Accounts? accountObj, User? UserObj)
        {
            ID = Convert.ToInt32(accountObj?.ID);
            UserId = Convert.ToInt32(accountObj?.UserId);
            Amount = Convert.ToDouble(accountObj?.Amount);
            OldBalance = Convert.ToDouble(accountObj?.OldBalance);
            NewBalance = Convert.ToDouble(accountObj?.NewBalance);
            Description = accountObj?.Description;
            TransactionType = accountObj?.TransactionType;
            isChequeTransaction = Convert.ToBoolean(accountObj?.isChequeTransaction);
            ChequeAndRefNo = accountObj?.ChequeAndRefNo;
            TransactionDate = Convert.ToDateTime(accountObj?.TransactionDate);

            FirstName = UserObj?.FirstName;
            LastName = UserObj?.LastName;
            UserName = UserObj?.UserName;
            AccountNo = UserObj?.AccountNo;
            AccountType = UserObj?.AccountType;

            FullName = $"{UserObj?.FirstName} {UserObj?.LastName}";
        }
        public int ID { get; set; }
        public int UserId { get; set; }
        public double Amount { get; set; }
        public double OldBalance { get; set; }
        public double NewBalance { get; set; }
        public string? Description { get; set; }
        public string? TransactionType { get; set; }// Cr & Dr
        public bool isChequeTransaction { get; set; } = false;
        public string? ChequeAndRefNo { get; set; }
        public DateTime TransactionDate { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? AccountNo { get; set; }
        public string? AccountType { get; set; }
        public string? FullName { get; set; }

    }
}

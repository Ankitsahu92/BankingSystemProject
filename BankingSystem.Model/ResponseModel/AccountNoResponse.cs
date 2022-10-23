using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.ResponseModel
{
    public class AccountNoResponse
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? AccountNo { get; set; }
        public string? AccountType { get; set; }

        public string? FullName
        {
            get { return $"{FirstName} {LastName}"; }
        }

    }
}

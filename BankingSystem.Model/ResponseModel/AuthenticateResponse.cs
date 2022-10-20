using BankingSystem.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.ResponseModel
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Token { get; set; }
        public bool isAdmin { get; set; }

        public AuthenticateResponse(UserVM user, string token)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            UserName = user.UserName;
            Token = token;
            isAdmin=user.isAdmin;
        }
    }
}

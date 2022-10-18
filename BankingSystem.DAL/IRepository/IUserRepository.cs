using BankingSystem.Common;
using BankingSystem.Model.EntityModel;
using BankingSystem.Model.Model;
using BankingSystem.Model.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.DAL.IRepository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<UserVM> AddAndUpdateUser(UserVM userObj);

        Task<bool> ChangePassword(ChangePassword userObj);
        
    }
}

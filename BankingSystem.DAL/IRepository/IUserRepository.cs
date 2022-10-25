using BankingSystem.Common;
using BankingSystem.Model.EntityModel;
using BankingSystem.Model.Model;
using BankingSystem.Model.RequestModel;
using BankingSystem.Model.ResponseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.DAL.IRepository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<ResponseModel> AddAndUpdateUser(UserVM req);
        Task<bool> ChangePassword(ChangePassword req);
        Task<bool> DeleteUser(DeleteUserRequest req);
    }
}

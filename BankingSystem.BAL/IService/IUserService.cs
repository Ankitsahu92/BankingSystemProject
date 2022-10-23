using BankingSystem.Model.Model;
using BankingSystem.Model.RequestModel;
using BankingSystem.Model.ResponseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.BAL.IService
{
    public interface IUserService
    {
        Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
        Task<IEnumerable<UserVM>> GetAll();
        Task<UserVM> GetById(int id);
        Task<UserVM> AddAndUpdateUser(UserVM userObj);
        Task<bool> ChangePassword(ChangePassword userObj);
        Task<bool> DeleteUser(DeleteUserRequest req);
    }
}

using BankingSystem.Model.Model;
using BankingSystem.Model.ResponseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.BAL.IService
{
    public interface IAccountsService
    {
        Task<IEnumerable<AccountNoResponse>> GetAllAccountNo();
        Task<AccountsVM> GetAccountBalanceByAccountNo(string accountNo);

        Task<AccountsVM> GetAccountBalanceByUserID(int UserId);

        Task<AccountsVM> GetTop10TransactionByAccountNo(string accountNo);

        Task<bool> AddAndSubtractBalances(AccountsVM obj);

        Task<bool> UpdateInterest();
    }
}

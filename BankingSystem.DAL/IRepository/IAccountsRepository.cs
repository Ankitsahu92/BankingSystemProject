using AutoMapper;
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
    public interface IAccountsRepository : IGenericRepository<Accounts>
    {
        Task<AccountsVM> GetAccountBalanceByAccountNo(string accountNo);

        Task<AccountsVM> GetAccountBalanceByUserID(int UserId);

        Task<AccountsVM> GetTop10TransactionByAccountNo(string accountNo);

        Task<bool> AddAndSubtractBalances(AccountsVM obj);

        Task<bool> UpdateInterest();
    }
}

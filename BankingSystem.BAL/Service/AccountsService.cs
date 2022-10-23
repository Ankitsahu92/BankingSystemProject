using BankingSystem.BAL.IService;
using BankingSystem.DAL.IRepository;
using BankingSystem.Model.EntityModel;
using BankingSystem.Model.Model;
using BankingSystem.Model.Model.Common;
using BankingSystem.Model.ResponseModel;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.BAL.Service
{
    public class AccountsService : IAccountsService
    {
        private readonly AppSettings appSettings;
        private readonly IAccountsRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public AccountsService(IOptions<AppSettings> _appSettings, IAccountsRepository repository, IUnitOfWork unitOfWork)
        {
            appSettings = _appSettings.Value;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<AccountNoResponse>> GetAllAccountNo()
        {
            return await repository.GetAllAccountNo();
        }

        public async Task<bool> AddAndSubtractBalances(AccountsVM obj)
        {
           return await repository.AddAndSubtractBalances(obj);
        }

        public async Task<AccountsVM> GetAccountBalanceByAccountNo(string accountNo)
        {
            return await repository.GetAccountBalanceByAccountNo(accountNo);
        }

        public async Task<AccountsVM> GetAccountBalanceByUserID(int UserId)
        {
            return await repository.GetAccountBalanceByUserID(UserId);
        }

        public async Task<AccountsVM> GetTop10TransactionByAccountNo(string accountNo)
        {
            return await repository.GetTop10TransactionByAccountNo(accountNo);
        }

        public async Task<bool> UpdateInterest()
        {
            return await repository.UpdateInterest();
        }
    }
}

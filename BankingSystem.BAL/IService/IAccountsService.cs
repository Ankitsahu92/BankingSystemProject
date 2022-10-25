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
    public interface IAccountsService
    {
        Task<IEnumerable<AccountNoResponse>> GetAllAccountNo();
        Task<AccountBalanceResponse> GetAccountBalanceByAccountNo(string accountNo);

        Task<AccountBalanceResponse> GetAccountBalanceByUserID(int UserId);

        Task<AccountsVM> GetTop10TransactionByAccountNo(string accountNo);

        Task<bool> AddAndSubtractBalances(AccountsVM obj);

        Task<bool> UpdateInterest();
        Task<ResponseModel> FundTransfer(FundTransferRequestModel req);
    }
}

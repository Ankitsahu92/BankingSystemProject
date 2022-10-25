using AutoMapper;
using BankingSystem.DAL.IRepository;
using BankingSystem.Entity.Context;
using BankingSystem.Model.EntityModel;
using BankingSystem.Model.Model;
using BankingSystem.Model.RequestModel;
using BankingSystem.Model.ResponseModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.DAL.Repository
{
    public class AccountsRepository : GenericRepository<Accounts>, IAccountsRepository
    {
        private readonly IMapper mapper;
        private readonly BankingSystemContext context;

        public AccountsRepository(IMapper mapper, BankingSystemContext context) : base(context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<IEnumerable<AccountNoResponse>> GetAllAccountNo()
        {
            IEnumerable<AccountNoResponse> result = await context.Users.Where(u => u.isAdmin == false).Select(s => new AccountNoResponse
            {
                Id = s.Id,
                AccountNo = s.AccountNo,
                AccountType = s.AccountType,
                FirstName = s.FirstName,
                LastName = s.LastName,
                UserName = s.UserName,
            }).ToListAsync();

            return result;
        }

        public async Task<AccountBalanceResponse> GetAccountBalanceByAccountNo(string accountNo)
        {
            var UserObj = await context.Users.Where(u => u.AccountNo == accountNo).FirstOrDefaultAsync();
            if (UserObj != null && UserObj.Id > 0)
            {
                Accounts? lastTrs = await context.Accounts.Where(u => u.UserId == UserObj.Id).OrderByDescending(o => o.ID).FirstOrDefaultAsync();
                if (lastTrs != null)
                {
                    return new AccountBalanceResponse(lastTrs, UserObj);
                }
                else
                {
                    return new AccountBalanceResponse(new Accounts(), UserObj);
                }
            }

            return null;
        }

        public async Task<AccountBalanceResponse> GetAccountBalanceByUserID(int UserId)
        {
            if (UserId > 0)
            {
                var UserObj = await context.Users.Where(u => u.Id == UserId).FirstOrDefaultAsync();
                Accounts? lastTrs = await context.Accounts.Where(u => u.UserId == UserId).OrderByDescending(o => o.ID).FirstOrDefaultAsync();
                if (lastTrs != null)
                {
                    return new AccountBalanceResponse(lastTrs, UserObj);
                }
                else
                {
                    return new AccountBalanceResponse(new Accounts(), UserObj);
                }
            }

            return null;
        }

        public async Task<ResponseModel> GetTop10TransactionByAccountNo(string accountNo)
        {
            ResponseModel response = new ResponseModel();
            int UserId = await context.Users.Where(u => u.AccountNo == accountNo).Select(s => s.Id).FirstOrDefaultAsync();
            if (UserId > 0)
            {
                List<Accounts> lastTrs = await context.Accounts
                    .Where(u => u.UserId == UserId)
                    .OrderByDescending(o => o.ID).Take(10)
                    .ToListAsync();
                if (lastTrs != null)
                {
                    response.Message = "";
                    response.Successs = true;
                    response.Data = lastTrs.OrderBy(o => o.ID).OrderBy(o => o.TransactionDate);
                }
            }

            return response;
        }

        public async Task<ResponseModel> GetTransactionByAccountNoAndDate(TransactionByAccountNoAndDateRequest req)
        {
            ResponseModel response = new ResponseModel();
            int UserId = await context.Users.Where(u => u.AccountNo == req.AccountNo).Select(s => s.Id).FirstOrDefaultAsync();
            if (UserId > 0)
            {
                DateTime ToDate = new DateTime(req.ToDate.Year, req.ToDate.Month, req.ToDate.Day, 23, 59, 59);

                List<Accounts> lastTrs = await context.Accounts
                    .Where(
                        u => u.UserId == UserId &&
                        u.TransactionDate >= req.FromDate &&
                        u.TransactionDate <= ToDate
                    )
                    .OrderByDescending(o => o.ID)
                    .ToListAsync();
                if (lastTrs != null)
                {
                    response.Message = "";
                    response.Successs = true;
                    response.Data = lastTrs.OrderBy(o => o.ID).OrderBy(o => o.TransactionDate);
                }
            }

            return response;
        }

        public async Task<bool> AddAndSubtractBalances(AccountsVM obj)
        {
            bool isSuccess = false;
            Accounts userAccounts = mapper.Map<Accounts>(obj);

            Accounts? lastTrs = await context.Accounts.Where(u => u.UserId == obj.UserId).OrderByDescending(o => o.ID).FirstOrDefaultAsync();
            if (lastTrs == null)
            {
                userAccounts.OldBalance = 0;
                userAccounts.NewBalance = userAccounts.Amount;
            }
            else
            {
                switch (obj.TransactionType.ToUpper())
                {
                    case "CR":
                        userAccounts.OldBalance = lastTrs.NewBalance;
                        userAccounts.NewBalance = lastTrs.NewBalance + userAccounts.Amount;
                        break;
                    case "DR":
                        userAccounts.OldBalance = lastTrs.NewBalance;
                        userAccounts.NewBalance = lastTrs.NewBalance - userAccounts.Amount;
                        break;
                    default:
                        break;
                }
            }

            userAccounts.isActive = true;
            await context.Accounts.AddAsync(mapper.Map<Accounts>(userAccounts));
            isSuccess = await context.SaveChangesAsync() > 0;

            return isSuccess;
        }

        public async Task<ResponseModel> UpdateInterest(AccountsVM req)
        {
            ResponseModel response = new ResponseModel();
            if (req != null)
            {
                await context.Accounts.AddAsync(mapper.Map<Accounts>(req));
                bool isSuccess = await context.SaveChangesAsync() > 0;
                if (isSuccess)
                {
                    response.Successs = true;
                    response.Message = "Interest Added Successful!!!";
                }
            }
            return response;
        }

        public async Task<bool> DeleteUser(DeleteUserRequest req)
        {
            bool isSuccess = false;
            Accounts? lastTrs = await context.Accounts.LastOrDefaultAsync(u => u.UserId == req.UserId);
            if (lastTrs != null)
            {
                lastTrs.isActive = false;
                lastTrs.ModifiedBy = lastTrs.ModifiedBy;
                lastTrs.ModifiedOn = DateTime.Now;
                lastTrs.ModifiedByIP = lastTrs.ModifiedByIP;
            }
            isSuccess = await context.SaveChangesAsync() > 0;

            return isSuccess;
        }

        public async Task<ResponseModel> FundTransfer(FundTransferRequestModel req)
        {
            DateTime date = DateTime.Now;
            ResponseModel response = new ResponseModel();
            if (req != null)
            {

                int FromUserId = await context.Users.Where(u => u.AccountNo == req.FromAccount).Select(s => s.Id).FirstOrDefaultAsync();
                int ToUserId = await context.Users.Where(u => u.AccountNo == req.ToAccount).Select(s => s.Id).FirstOrDefaultAsync();

                if (FromUserId > 0 && ToUserId > 0)
                {
                    Accounts? fromLastTrs = await context.Accounts.Where(u => u.UserId == FromUserId).OrderByDescending(o => o.ID).FirstOrDefaultAsync();
                    Accounts? toLastTrs = await context.Accounts.Where(u => u.UserId == ToUserId).OrderByDescending(o => o.ID).FirstOrDefaultAsync();
                    if (
                        fromLastTrs != null &&

                        fromLastTrs?.NewBalance >= req?.Amount
                        )
                    {
                        double toNewBalance = 0;
                        if (toLastTrs != null)
                        {
                            toNewBalance = toLastTrs.NewBalance;
                        }

                        Accounts fromAccountsVM = new Accounts()
                        {
                            Amount = req.Amount,
                            NewBalance = fromLastTrs.NewBalance - req.Amount,
                            CreatedBy = req.CreatedBy,
                            CreatedByIP = req.CreatedByIP,
                            CreatedOn = date,
                            isActive = true,
                            OldBalance = fromLastTrs.NewBalance,
                            TransactionDate = date,
                            UserId = FromUserId,
                            TransactionType = "Dr",
                            Description = req.Description,
                            ChequeAndRefNo = $"Fund Transfer Form {req.FromAccount} To {req.ToAccount}",
                        };

                        Accounts toAccountsVM = new Accounts()
                        {
                            Amount = req.Amount,
                            NewBalance = toNewBalance + req.Amount,
                            CreatedBy = req.CreatedBy,
                            CreatedByIP = req.CreatedByIP,
                            CreatedOn = date,
                            isActive = true,
                            OldBalance = toNewBalance,
                            TransactionDate = date,
                            UserId = ToUserId,
                            TransactionType = "Cr",
                            Description = req.Description,
                            ChequeAndRefNo = $"Fund Transfer Form {req.FromAccount} To {req.ToAccount}",
                        };

                        await context.Accounts.AddAsync(mapper.Map<Accounts>(fromAccountsVM));
                        await context.Accounts.AddAsync(mapper.Map<Accounts>(toAccountsVM));
                        bool isSuccess = await context.SaveChangesAsync() > 0;
                        if (isSuccess)
                        {
                            response.Successs = true;
                            response.Message = "Fund Transfer Successful!!!";
                        }
                    }
                    else
                    {
                        response.Message = "Insufficient Balance !!!";
                    }
                }
            }
            return response;
        }
    }
}

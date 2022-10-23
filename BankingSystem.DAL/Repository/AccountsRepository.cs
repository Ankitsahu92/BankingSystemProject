﻿using AutoMapper;
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

        public async Task<AccountsVM> GetAccountBalanceByAccountNo(string accountNo)
        {
            int UserId = await context.Users.Where(u => u.AccountNo == accountNo).Select(s => s.Id).FirstOrDefaultAsync();
            if (UserId > 0)
            {
                Accounts? lastTrs = await context.Accounts.LastOrDefaultAsync(u => u.UserId == UserId);
                if (lastTrs != null)
                {
                    return mapper.Map<AccountsVM>(lastTrs);
                }
            }

            return null;
        }

        public async Task<AccountsVM> GetAccountBalanceByUserID(int UserId)
        {
            if (UserId > 0)
            {
                Accounts? lastTrs = await context.Accounts.LastOrDefaultAsync(u => u.UserId == UserId);
                if (lastTrs != null)
                {
                    return mapper.Map<AccountsVM>(lastTrs);
                }
            }

            return null;
        }

        public async Task<AccountsVM> GetTop10TransactionByAccountNo(string accountNo)
        {
            int UserId = await context.Users.Where(u => u.AccountNo == accountNo).Select(s => s.Id).FirstOrDefaultAsync();
            if (UserId > 0)
            {
                List<Accounts> lastTrs = await context.Accounts.Where(u => u.UserId == UserId).TakeLast(10).ToListAsync();
                if (lastTrs != null)
                {
                    return mapper.Map<AccountsVM>(lastTrs);
                }
            }

            return null;
        }

        public async Task<bool> AddAndSubtractBalances(AccountsVM obj)
        {
            bool isSuccess = false;
            Accounts userAccounts = mapper.Map<Accounts>(obj);

            Accounts? lastTrs = await context.Accounts.LastOrDefaultAsync(u => u.UserId == obj.UserId);
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

        public async Task<bool> UpdateInterest()
        {
            bool isSuccess = false;


            return isSuccess;
        }

        public async Task<bool> DeleteUser(DeleteUserRequest req)
        {
            bool isSuccess = false;
            Accounts? lastTrs = await context.Accounts.LastOrDefaultAsync(u => u.UserId == req.UserId);
            if (lastTrs != null)
            {
                lastTrs.isActive =false;
                lastTrs.ModifiedBy = lastTrs.ModifiedBy;
                lastTrs.ModifiedOn = DateTime.Now;
                lastTrs.ModifiedByIP = lastTrs.ModifiedByIP;
            }
            isSuccess = await context.SaveChangesAsync() > 0;

            return isSuccess;
        }

        //public async Task<bool> DeleteUser(DeleteUserRequest req)
        //{
        //   re
        //}
    }
}

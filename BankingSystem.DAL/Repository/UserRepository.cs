using AutoMapper;
using BankingSystem.Common;
using BankingSystem.DAL.IRepository;
using BankingSystem.Entity.Context;
using BankingSystem.Model.EntityModel;
using BankingSystem.Model.Model;
using BankingSystem.Model.RequestModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.DAL.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly IMapper mapper;
        private readonly BankingSystemContext context;

        public UserRepository(IMapper mapper, BankingSystemContext context) : base(context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<UserVM> AddAndUpdateUser(UserVM userObj)
        {
            bool isSuccess = false;
            if (userObj.Id > 0)
            {
                var obj = await context.Users.SingleOrDefaultAsync(u => u.Id == userObj.Id);
                if (obj != null)
                {
                    obj.FirstName = userObj.FirstName;
                    obj.LastName = userObj.LastName;
                    obj.UserName = userObj.UserName;
                    obj.AccountNo = userObj.AccountNo;
                    obj.AccountType = userObj.AccountType;
                    obj.isAdmin = userObj.isAdmin;
                    obj.ModifiedBy = userObj.ModifiedBy;
                    obj.ModifiedOn = DateTime.Now;
                    obj.ModifiedByIP = userObj.ModifiedByIP;
                    obj.isActive = userObj.isActive;
                    if (!string.IsNullOrEmpty(userObj.Password))
                    {
                        obj.Password = EncryptionAndDescription.Encrypt(userObj.Password);
                    }
                    context.Update(obj);
                    isSuccess = await context.SaveChangesAsync() > 0;
                }
            }
            else
            {
                User user = mapper.Map<User>(userObj);
                user.isActive = true;
                user.Password = EncryptionAndDescription.Encrypt(user.Password);
                await context.Users.AddAsync(user);
                isSuccess = await context.SaveChangesAsync() > 0;
            }

            return isSuccess ? userObj : null;
        }

        public async Task<bool> ChangePassword(ChangePassword userObj)
        {
            bool isSuccess = false;
            if (userObj.UserID > 0)
            {
                var obj = await context.Users.SingleOrDefaultAsync(u => u.Id == userObj.UserID);
                if (obj != null)
                {
                    obj.ModifiedBy = userObj.UserID;
                    obj.ModifiedOn = DateTime.Now;
                    if (!string.IsNullOrEmpty(userObj.Password))
                    {
                        obj.Password = EncryptionAndDescription.Encrypt(userObj.Password);
                    }
                    context.Update(obj);
                    isSuccess = await context.SaveChangesAsync() > 0;
                }
            }
            return isSuccess;
        }

        public async Task<bool> DeleteUser(DeleteUserRequest req)
        {
            bool isSuccess = false;
            if (req.UserId > 0)
            {
                var obj = await context.Users.SingleOrDefaultAsync(u => u.Id == req.UserId);
                if (obj != null)
                {
                    obj.ModifiedBy = req.ModifiedBy;
                    obj.ModifiedOn = DateTime.Now;
                    obj.ModifiedByIP = req.ModifiedByIP;
                    obj.isActive = false;
                    context.Update(obj);
                    isSuccess = await context.SaveChangesAsync() > 0;
                }
            }
            return isSuccess;
        }

        /* public async Task<IEnumerable<CustomerSP>> getAllCustomersSP(int id)
         {
             //var param = new SqlParameter[] {
             //new SqlParameter("@id",id)
             //};
             //return await db.CustomerSP.FromSqlRaw($"exec USP_GetCustomers {string.Join(",", param.Select(s=>s.ParameterName).ToList())} ", param).ToListAsync();
             SqlParameter[] param = new SqlParameter[]{
                     new SqlParameter("@id",id)
             };
             DataSet ds = db.ExecuteProcedure("USP_GetCustomers", param);
             if (ds?.Tables?.Count > 0)
             {
                 return ds.Tables[0].AsEnumerable().Select(row =>
                      new CustomerSP
                      {
                          CustomerId = row.Field<int>("CustomerId"),
                          FirstName = row.Field<string>("FirstName"),
                          LastName = row.Field<string>("LastName"),
                          Address = row.Field<string>("Address")
                      }).ToList();
             }

             return null;
         }*/
    }
}

using AutoMapper;
using BankingSystem.DAL.IRepository;
using BankingSystem.Entity.Context;
using BankingSystem.Model.EntityModel;
using BankingSystem.Model.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.DAL.Repository
{
    public class EmployeeRepository : GenericRepository<Employee>, IEmployeeRepository
    {
        private readonly IMapper mapper;
        private readonly BankingSystemContext context;

        public EmployeeRepository(IMapper mapper, BankingSystemContext context) : base(context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<EmployeeVM> AddAndUpdateEmployee(EmployeeVM empObj)
        {
            bool isSuccess = false;
            if (empObj.Id > 0)
            {
                var obj = await context.Employee.SingleOrDefaultAsync(u => u.Id == empObj.Id);
                if (obj != null)
                {
                    obj.Name = empObj.Name;
                    obj.Email = empObj.Email;
                    obj.Mobile = empObj.Mobile;
                    obj.Gender = empObj.Gender;
                    obj.DOB = empObj.DOB;
                    obj.IsActive = empObj.IsActive;
                    obj.Range = empObj.Range;
                    obj.UserType = empObj.UserType;
                    context.Update(obj);
                    isSuccess = await context.SaveChangesAsync() > 0;
                }
            }
            else
            {
                Employee user = mapper.Map<Employee>(empObj);
                user.IsActive = true;
                await context.Employee.AddAsync(mapper.Map<Employee>(empObj));
                isSuccess = await context.SaveChangesAsync() > 0;
            }

            return isSuccess ? empObj : null;
        }

        public async Task<bool> DeleteEmployee(int empID)
        {
            bool isSuccess = false;
            if (empID > 0)
            {
                var obj = await context.Employee.SingleOrDefaultAsync(u => u.Id == empID);
                if (obj != null)
                {
                    obj.IsActive = false;
                    context.Update(obj);
                    isSuccess = await context.SaveChangesAsync() > 0;
                }
            }
            return isSuccess;
        }
    }
}

using BankingSystem.Model.EntityModel;
using BankingSystem.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.DAL.IRepository
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
        Task<EmployeeVM> AddAndUpdateEmployee(EmployeeVM empObj);
        Task<bool> DeleteEmployee(int empID);
    }
}

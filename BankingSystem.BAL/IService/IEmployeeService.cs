using BankingSystem.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.BAL.IService
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeVM>> GetAll();

        Task<EmployeeVM> GetById(int id);

        Task<EmployeeVM> AddAndUpdateEmployee(EmployeeVM empObj);
        Task<bool> DeleteEmployee(int empID);
    }
}

using BankingSystem.BAL.IService;
using BankingSystem.DAL.IRepository;
using BankingSystem.Model.Model;
using BankingSystem.Model.Model.Common;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.BAL.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly AppSettings appSettings;
        private readonly IEmployeeRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public EmployeeService(IOptions<AppSettings> _appSettings, IEmployeeRepository repository, IUnitOfWork unitOfWork)
        {
            appSettings = _appSettings.Value;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<EmployeeVM>> GetAll()
        {
            var EmpList = await unitOfWork.Employee.GetAll();
            return EmpList.Where(e => e.IsActive == true).ToList();
        }

        public async Task<EmployeeVM> GetById(int id)
        {
            return await unitOfWork.Employee.GetById(id);
        }

        public async Task<EmployeeVM> AddAndUpdateEmployee(EmployeeVM empObj)
        {
            return await repository.AddAndUpdateEmployee(empObj);
        }
        public async Task<bool> DeleteEmployee(int empID)
        {
            return await repository.DeleteEmployee(empID);
        }
    }
}

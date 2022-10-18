using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.DAL.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository User { get; }
        IEmployeeRepository Employee { get; }
        //IQuestionsRepository Questions { get; }
        int Complete();
        Task<int> CompleteAsync();
    }
}

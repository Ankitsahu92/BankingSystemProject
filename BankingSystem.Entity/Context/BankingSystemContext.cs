using BankingSystem.Common;
using BankingSystem.Model.EntityModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Entity.Context
{
    public class BankingSystemContext : DbContext
    {
        public BankingSystemContext(DbContextOptions<BankingSystemContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Accounts> Accounts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    FirstName = "System",
                    LastName = "System",
                    UserName = "8978786933",
                    Password = EncryptionAndDescription.Encrypt("System@1234"),
                    isAdmin=true,
                    CreatedBy = 1,
                    CreatedOn = DateTime.Now
                }
            );
        }
    }
}

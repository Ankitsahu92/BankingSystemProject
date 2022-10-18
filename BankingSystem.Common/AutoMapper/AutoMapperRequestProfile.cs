using AutoMapper;
using BankingSystem.Model.EntityModel;
using BankingSystem.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Common.AutoMapper
{
    public class AutoMapperRequestProfile : Profile
    {
        public AutoMapperRequestProfile()
        {
            CreateMap<User, UserVM>().ReverseMap();
            CreateMap<Employee, EmployeeVM>().ReverseMap();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Model.ResponseModel
{
    public class ResponseModel
    {
        public bool Successs { get; set; } = false;
        public string Message { get; set; } = "Something Went Wrong !!!";
        public object? Data { get; set; }
    }
}

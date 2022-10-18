using BankingSystem.BAL.IService;
using BankingSystem.Filters;
using BankingSystem.Model.Model;
using BankingSystem.Model.RequestModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace BankingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService service;

        public EmployeeController(IEmployeeService service)
        {
            this.service = service;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await service.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeeVM empObj)
        {
            empObj.Id = 0;
            return Ok(await service.AddAndUpdateEmployee(empObj));
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EmployeeVM empObj)
        {
            return Ok(await service.AddAndUpdateEmployee(empObj));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await service.DeleteEmployee(id));
        }
    }
}

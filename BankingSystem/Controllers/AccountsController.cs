using BankingSystem.BAL.IService;
using BankingSystem.Filters;
using BankingSystem.Model.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountsService service;
        public AccountsController(IAccountsService service)
        {
            this.service = service;
        }

        [HttpPost("AddAndSubtractBalances")]
        public async Task<IActionResult> AddAndSubtractBalances([FromBody] AccountsVM obj)
        {
            return Ok(await service.AddAndSubtractBalances(obj));
        }

        [HttpGet("GetAccountBalanceByAccountNo")]
        public async Task<IActionResult> GetAccountBalanceByAccountNo(string accountNo)
        {
            return Ok(await service.GetAccountBalanceByAccountNo(accountNo));
        }

        [HttpGet("GetAccountBalanceByUserID")]
        public async Task<IActionResult> GetAccountBalanceByUserID(int UserId)
        {
            return Ok(await service.GetAccountBalanceByUserID(UserId));
        }

        [HttpGet("GetTop10TransactionByAccountNo")]
        public async Task<IActionResult> GetTop10TransactionByAccountNo(string accountNo)
        {
            return Ok(await service.GetTop10TransactionByAccountNo(accountNo));
        }

        [HttpPost("UpdateInterest")]
        public async Task<IActionResult> UpdateInterest()
        {
            return Ok(await service.UpdateInterest());
        }
    }
}

using BankingSystem.BAL.IService;
using BankingSystem.Filters;
using BankingSystem.Model.Model;
using BankingSystem.Model.RequestModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService userService;

        public UsersController(IUserService _userService)
        {
            userService = _userService;
        }

        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            //var ip = this.IpAddress();
            var response = await userService.Authenticate(model);
            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            return Ok(response);
        }



        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok(await userService.GetAll());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await userService.GetById(id));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] UserVM userObj)
        {
            userObj.Id = 0;
            return Ok(await userService.AddAndUpdateUser(userObj));
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] UserVM userObj)
        {
            return Ok(await userService.AddAndUpdateUser(userObj));
        }
    }
}

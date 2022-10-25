using BankingSystem.BAL.IService;
using BankingSystem.Filters;
using BankingSystem.Model.Model;
using BankingSystem.Model.RequestModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AuthorizeAttribute = BankingSystem.Filters.AuthorizeAttribute;

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

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            //var ip = this.IpAddress();
            var response = await userService.Authenticate(model);
            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            return Ok(response);
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> Get()
        {
            var data = await userService.GetAll();
            if (data != null)
            {
                foreach (var item in data)
                {
                    item.Password = String.Empty;
                }
            }
            return Ok(data);
        }

        [HttpGet("{id}"), Authorize]
        public async Task<IActionResult> Get(int id)
        {
            var data = await userService.GetById(id);
            if(data != null)
            {
                data.Password = String.Empty;
            }
            return Ok(data);
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Post([FromBody] UserVM userObj)
        {
            userObj.Id = 0;
            return Ok(await userService.AddAndUpdateUser(userObj));
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> Put([FromBody] UserVM userObj)
        {
            return Ok(await userService.AddAndUpdateUser(userObj));
        }

        [HttpPut("DeleteUser"), Authorize]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserRequest req)
        {
            return Ok(await userService.DeleteUser(req));
        }

        [HttpPut("ChangePassword"), Authorize]
        public async Task<IActionResult> Put([FromBody] ChangePassword userObj)
        {
            return Ok(await userService.ChangePassword(userObj));
        }

        [HttpGet("MakeCheckbookRequest"), Authorize]
        public async Task<IActionResult> MakeCheckbookRequest(int userID)
        {
            return Ok(await userService.MakeCheckbookRequest(userID));
        }
    }
}

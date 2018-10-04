using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TestReact.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static List<User> UserList = new List<User>()
            {
                new User(){Email = "TestMail@sg.sdg", FirstName = "Ivan", LastName = "Ivanov", Login = "Ivanio"},
                new User() { Email = "TestMail2@sg.sdg", FirstName = "Fedor", LastName = "Fedorov", Login = "Fedorio" }

            };
        [Authorize]
        [HttpGet("[action]")]
        public IEnumerable<User> Users()
        {
            return UserList;
        }

        public class User
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Login { get; set; }
            public string Email { get; set; }
        }
    }
}

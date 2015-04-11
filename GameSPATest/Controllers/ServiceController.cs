using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TypeLite;

namespace SPATest.Controllers
{
    public class ServiceController : Controller
    {
        [TsClass]
        public class RequestRegisterUser
        {
            public string Email { get; set; }
            public string Comment { get; set; }
        }

        [TsClass]
        public class RequestRemoveUser
        {
            public string Id { get; set; }
        }


        [HttpPost]
        public ActionResult RegisterUser(RequestRegisterUser req)
        {
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}
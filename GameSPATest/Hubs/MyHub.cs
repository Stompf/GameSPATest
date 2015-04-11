using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SPATest.Hubs
{
    public class MyHub : Hub
    {
        public void Hello(string test)
        {
            Clients.All.hello(test);
        }
    }
}
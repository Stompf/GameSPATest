﻿using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System;
using System.Linq;
using SPATest.ServerCode;

namespace SPATest.Hubs
{
	public class MyHub : Hub
    {
		public void SearchForGame()
        {
			Matchmaking.Instance.SearchForGame(this);
        }

		public override Task OnConnected()
		{
			return base.OnConnected();
		}

		public override Task OnDisconnected(bool stopCalled)
		{
			Matchmaking.Instance.OnDisconnect(this);
			return base.OnDisconnected(stopCalled);
		}

		public override Task OnReconnected()
		{
			return base.OnReconnected();
		}
	}
}
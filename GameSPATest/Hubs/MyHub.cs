using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System;
using System.Linq;

namespace SPATest.Hubs
{
	public class MyHub : Hub
    {
		HashSet<string> CurrentGroups = new HashSet<string>();
		private Object groupsLock = new Object();

		Dictionary<string, Microsoft.AspNet.SignalR.Hubs.HubCallerContext> LookingForGame = new Dictionary<string, Microsoft.AspNet.SignalR.Hubs.HubCallerContext>();
		private Object lookingForGameLock = new Object();

		public void SearchForGame()
        {
			lock(lookingForGameLock)
			{
				if (LookingForGame.Any() && LookingForGame.First().Key != Context.ConnectionId)
				{
					var player1 = LookingForGame.First();
					LookingForGame.Remove(player1.Key);
					StartNewGame(player1.Value, Context);
				}
				else
				{
					LookingForGame[Context.ConnectionId] = Context;
				}
			}
        }

		public override Task OnConnected()
		{
			return base.OnConnected();
		}

		public override Task OnDisconnected(bool stopCalled)
		{
			return base.OnDisconnected(stopCalled);
		}

		public override Task OnReconnected()
		{
			return base.OnReconnected();
		}

		private void StartNewGame(Microsoft.AspNet.SignalR.Hubs.HubCallerContext player1, Microsoft.AspNet.SignalR.Hubs.HubCallerContext player2)
		{
			var groupName = player1.ConnectionId + "-" + player2.ConnectionId + DateTime.Now.ToString();
			Groups.Add(player1.ConnectionId, groupName);
			Groups.Add(player2.ConnectionId, groupName);

			lock(groupsLock)
			{
				CurrentGroups.Add(groupName);
			}

			Clients.Group(groupName).newGameStart("start");
		}
	}
}
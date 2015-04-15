using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SPATest.Hubs;

namespace SPATest.ServerCode
{
	public class Game
	{
		public string GroupReference { get; set; }
		public dynamic GroupManager { get; }

		public Player player1 { get; }
		public Player player2 { get; }

		public Game(Player player1, Player player2, MyHub myHub)
		{
			GroupReference = player1.ConnectionId + "-" + player2.ConnectionId + DateTime.Now.ToString();
			player1.currentGame = this;
			player2.currentGame = this;
			this.player1 = player1;
			this.player2 = player2;
			myHub.Groups.Add(player1.ConnectionId, GroupReference);
			myHub.Groups.Add(player2.ConnectionId, GroupReference);
			GroupManager = myHub.Clients.Group(GroupReference);
        }

		public void StartGame()
		{
			GroupManager.newGameStart(new NewGameStartEntity() { startTime = DateTime.Now.AddSeconds(5) });
		}

		public void EndGame(MyHub myHub)
		{
			GroupManager.endGame("end - " + GroupReference);
			myHub.Groups.Remove(player1.ConnectionId, GroupReference);
			myHub.Groups.Remove(player2.ConnectionId, GroupReference);			
		}
	}
}
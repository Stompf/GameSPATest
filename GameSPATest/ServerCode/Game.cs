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

		public Map CurrentMap { get; }

		public Player player1 { get; }
		public Player player2 { get; }

		public Game(Player player1, Player player2, MyHub myHub)
		{
			GroupReference = player1.ConnectionId + "-" + player2.ConnectionId + DateTime.Now.ToString();
			this.player1 = player1;
			this.player1.GameGroupID = GroupReference;

			this.player2 = player2;
			this.player2.GameGroupID = GroupReference;

			CurrentMap = new Map();

			myHub.Groups.Add(player1.ConnectionId, GroupReference);
			myHub.Groups.Add(player2.ConnectionId, GroupReference);
			GroupManager = myHub.Clients.Group(GroupReference);

			InitGame();
		}

		public void InitGame()
		{
			GroupManager.initGame(new InitGameEntity { Map = CurrentMap, Players = new Player[] { player1, player2 } });
		}

		public void ReadyRecived(Player player)
		{
			player.IsReady = true;
			if (player1.IsReady && player2.IsReady)
			{
				GroupManager.newGameStart(new NewGameStartEntity() { StartTime = DateTime.Now.AddSeconds(5) });
			}
		}

		public void StartGame()
		{
			GroupManager.newGameStart(new NewGameStartEntity() { StartTime = DateTime.Now.AddSeconds(5) });
		}

		public void EndGame(MyHub myHub)
		{
			GroupManager.endGame("end - " + GroupReference);
			myHub.Groups.Remove(player1.ConnectionId, GroupReference);
			myHub.Groups.Remove(player2.ConnectionId, GroupReference);
		}
	}
}
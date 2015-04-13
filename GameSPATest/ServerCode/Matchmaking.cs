using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SPATest.Hubs;

namespace SPATest.ServerCode
{
	public sealed class Matchmaking
	{
		private static readonly Lazy<Matchmaking> lazy = new Lazy<Matchmaking>(() => new Matchmaking());

		public static Matchmaking Instance { get { return lazy.Value; } }

		public Dictionary<string, Player> CurrentPlayers { get; }
		private Object playersObject = new Object();

		public HashSet<string> LookingForGame { get; }
		private Object lookingForGameLock = new Object();

		private Matchmaking()
		{
			CurrentPlayers = new Dictionary<string, Player>();
			LookingForGame = new HashSet<string>();
		}

		public void SearchForGame(MyHub myHub)
		{
			lock (lookingForGameLock)
			{
				if (LookingForGame.Any() && LookingForGame.First() != myHub.Context.ConnectionId)
				{
					var player1 = new Player(LookingForGame.First());
					var player2 = new Player(myHub.Context.ConnectionId);
					LookingForGame.Remove(player1.ConnectionId);

					CurrentPlayers[player1.ConnectionId] = player1;
					CurrentPlayers[player2.ConnectionId] = player2;

					var newGame = new Game(player1, player2, myHub);
					myHub.Groups.Add(player1.ConnectionId, newGame.GroupReference);
					myHub.Groups.Add(myHub.Context.ConnectionId, newGame.GroupReference);
					newGame.StartGame();
				}
				else
				{
					LookingForGame.Add(myHub.Context.ConnectionId);
				}
			}
		}

		public void OnDisconnect(MyHub myHub)
		{
			lock (lookingForGameLock)
			{
				if (LookingForGame.Contains(myHub.Context.ConnectionId))
				{
					LookingForGame.Remove(myHub.Context.ConnectionId);
				}
			}

			lock (playersObject)
			{
				if (CurrentPlayers.ContainsKey(myHub.Context.ConnectionId))
				{
					var game = CurrentPlayers[myHub.Context.ConnectionId].currentGame;
					if (game != null)
					{
						game.EndGame(myHub);

						Player playerBackInQueue;
						if (game.player1.ConnectionId == myHub.Context.ConnectionId)
						{
							playerBackInQueue = game.player2;
						}
						else
						{
							playerBackInQueue = game.player1;
						}
						LookingForGame.Add(playerBackInQueue.ConnectionId);
					}
				}
			}
		}
	}
}
﻿using System;
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
		private Object playersLockObject = new Object();

		public Dictionary<string, Game> CurrentGames { get; }
		private Object gamesLockObject = new Object();

		public HashSet<string> LookingForGame { get; }
		private Object lookingForGameLockObject = new Object();

		private Matchmaking()
		{
			CurrentPlayers = new Dictionary<string, Player>();
			LookingForGame = new HashSet<string>();
			CurrentGames = new Dictionary<string, Game>();
        }

		public void SearchForGame(MyHub myHub)
		{
			lock (lookingForGameLockObject)
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
					CurrentGames[newGame.GroupReference] = newGame;
					newGame.StartGame();
				}
				else
				{
					LookingForGame.Add(myHub.Context.ConnectionId);
				}
			}
		}

		public void ReadyRecived(string connectionID)
		{
			lock(playersLockObject)
			{
				var player = CurrentPlayers[connectionID];
				if (player != null)
				{
					lock(gamesLockObject)
					{
						var game = CurrentGames[player.GameGroupID];
						if (game != null)
						{
							game.ReadyRecived(player);
						}
					}
				}
			}
		}

		public void OnDisconnect(MyHub myHub)
		{
			lock (lookingForGameLockObject)
			{
				if (LookingForGame.Contains(myHub.Context.ConnectionId))
				{
					LookingForGame.Remove(myHub.Context.ConnectionId);
				}
			}

			lock (playersLockObject)
			{
				if (CurrentPlayers.ContainsKey(myHub.Context.ConnectionId))
				{
					lock (gamesLockObject)
					{
						var game = CurrentGames[CurrentPlayers[myHub.Context.ConnectionId].GameGroupID];
						if (game != null)
						{
							game.EndGame(myHub);
							if (game.player1.ConnectionId == myHub.Context.ConnectionId)
							{
								CurrentPlayers.Remove(game.player2.ConnectionId);
							}
							else
							{
								CurrentPlayers.Remove(game.player1.ConnectionId);
							}
						}
						CurrentGames.Remove(game.GroupReference);
                    }
					CurrentPlayers.Remove(myHub.Context.ConnectionId);
                }
			}
		}
	}
}
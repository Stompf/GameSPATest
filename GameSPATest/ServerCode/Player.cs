using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SPATest.ServerCode
{
	public class Player
	{
		public Game currentGame { get; set; }
		public string ConnectionId { get; }
        

		public Player(string connectionId)
		{
			ConnectionId = connectionId;
		}



	}
}
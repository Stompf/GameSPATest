﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TypeLite;

namespace SPATest.ServerCode
{
	[TsClass]
	public class Player
	{
		[TsIgnore]
		public string GameGroupID { get; set; }

		[TsIgnore]
		public bool IsReady { get; set; }

		public string ConnectionId { get; }
        public Vector2D Position { get; set; }
		public string Color { get; set; }

		public Player(string connectionId)
		{
			ConnectionId = connectionId;
		}



	}
}
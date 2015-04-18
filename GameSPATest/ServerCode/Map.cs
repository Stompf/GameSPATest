using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TypeLite;

namespace SPATest.ServerCode
{
	[TsClass]
	public class Map
	{
		public Size MapSize { get; }

		public Map()
		{
			MapSize = new Size() { Height = 500, Width = 1000 };
		}

	}
}
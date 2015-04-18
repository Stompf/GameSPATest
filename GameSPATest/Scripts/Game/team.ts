﻿module Team {
    export function toString(team: GameEntites.Team) {
        switch (team) {
            case GameEntites.Team.RED:
                return "Team Red";
            case GameEntites.Team.BLUE:
                return "Team Blue";
            default:
                return "undefined";
        }
    }

	export function serverToGameEntity(team: SPATest.ServerCode.Team) {
		switch (team) {
            case SPATest.ServerCode.Team.RED:
                return GameEntites.Team.RED;
            case SPATest.ServerCode.Team.BLUE:
                return GameEntites.Team.BLUE;
            default:
                return GameEntites.Team.RED;
        }
	}
}
export = Team;
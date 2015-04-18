define(["require", "exports"], function (require, exports) {
    var Team;
    (function (Team) {
        function toString(team) {
            switch (team) {
                case 1 /* RED */:
                    return "Team Red";
                case 0 /* BLUE */:
                    return "Team Blue";
                default:
                    return "undefined";
            }
        }
        Team.toString = toString;
        function serverToGameEntity(team) {
            switch (team) {
                case 1 /* RED */:
                    return 1 /* RED */;
                case 0 /* BLUE */:
                    return 0 /* BLUE */;
                default:
                    return 1 /* RED */;
            }
        }
        Team.serverToGameEntity = serverToGameEntity;
    })(Team || (Team = {}));
    return Team;
});
//# sourceMappingURL=team.js.map
define(["require", "exports"], function (require, exports) {
    var Team;
    (function (Team) {
        (function (TeamEnum) {
            TeamEnum[TeamEnum["RED"] = 0] = "RED";
            TeamEnum[TeamEnum["BLUE"] = 1] = "BLUE";
        })(Team.TeamEnum || (Team.TeamEnum = {}));
        var TeamEnum = Team.TeamEnum;
        function toString(team) {
            switch (team) {
                case 0 /* RED */:
                    return "Team Red";
                case 1 /* BLUE */:
                    return "Team Blue";
                default:
                    return "undefined";
            }
        }
        Team.toString = toString;
    })(Team || (Team = {}));
    return Team;
});
//# sourceMappingURL=team.js.map
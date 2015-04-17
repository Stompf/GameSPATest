define(["require", "exports", "./KeyboardStates", "./team"], function (require, exports, KeyboardStates, Team) {
    var Player = (function () {
        function Player(startPos, keyboardGroup, team, isLocalPlayer) {
            this.speed = 250;
            this.currentPosition = startPos;
            this.team = team;
            this.color = this.setColor(team);
            this.size = Player.StartSize;
            this.isLocalPlayer = isLocalPlayer;
            this.keyboardStates = new KeyboardStates(keyboardGroup);
        }
        Player.prototype.draw = function (ctx, deltaTick) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.currentPosition.x, this.currentPosition.y, this.size.width, this.size.height);
        };
        Player.prototype.update = function (ctx, map, tickLenght) {
            var newPosition = this.currentPosition;
            if (this.isLocalPlayer) {
                if (this.keyboardStates.isUpKeyDown) {
                    var newPos = {
                        x: newPosition.x,
                        y: newPosition.y - (this.speed / tickLenght)
                    };
                    if (map.isValidPosition(newPos, this.size)) {
                        newPosition = newPos;
                    }
                }
                if (this.keyboardStates.isDownKeyDown) {
                    var newPos = {
                        x: newPosition.x,
                        y: newPosition.y + (this.speed / tickLenght)
                    };
                    if (map.isValidPosition(newPos, this.size)) {
                        newPosition = newPos;
                    }
                }
                if (this.keyboardStates.isLeftKeyDown) {
                    var newPos = {
                        x: newPosition.x - (this.speed / tickLenght),
                        y: newPosition.y
                    };
                    if (map.isValidPosition(newPos, this.size)) {
                        newPosition = newPos;
                    }
                }
                if (this.keyboardStates.isRightKeyDown) {
                    var newPos = {
                        x: newPosition.x + (this.speed / tickLenght),
                        y: newPosition.y
                    };
                    if (map.isValidPosition(newPos, this.size)) {
                        newPosition = newPos;
                    }
                }
            }
            this.currentPosition = newPosition;
        };
        Player.prototype.checkWinningCondition = function (map) {
            switch (this.team) {
                case 1 /* BLUE */:
                    return map.teamRedZone.isInBounds(this.currentPosition);
                case 0 /* RED */:
                    return map.teamBlueZone.isInBounds(this.currentPosition);
                default:
                    alert("checkWinningCondition - Team not found!");
            }
        };
        Player.prototype.victoryMessage = function () {
            return Team.toString(this.team) + " won!";
        };
        Player.prototype.setColor = function (team) {
            switch (team) {
                case 0 /* RED */:
                    return "red";
                case 1 /* BLUE */:
                    return "blue";
                default:
                    alert("Could not find team: " + team);
            }
        };
        Player.StartSize = { height: 10, width: 10 };
        return Player;
    })();
    return Player;
});
//# sourceMappingURL=player.js.map
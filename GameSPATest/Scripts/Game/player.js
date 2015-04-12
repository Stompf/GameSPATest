define(["require", "exports", "./KeyboardStates", "./team"], function (require, exports, KeyboardStates, Team) {
    var Player = (function () {
        function Player(startPos, keyboardGroup, team) {
            this.speed = 250;
            this.currentPosition = startPos;
            this.team = team;
            this.color = this.setColor(team);
            this.size = Player.StartSize;
            this.keyboardStates = new KeyboardStates(keyboardGroup);
        }
        Player.prototype.draw = function (ctx, deltaTick) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.currentPosition.X, this.currentPosition.Y, this.size.width, this.size.height);
        };
        Player.prototype.update = function (ctx, map, tickLenght) {
            var newPosition = this.currentPosition;
            if (this.keyboardStates.isUpKeyDown) {
                var newPos = {
                    X: newPosition.X,
                    Y: newPosition.Y - (this.speed / tickLenght)
                };
                if (map.isValidPosition(newPos, this.size)) {
                    newPosition = newPos;
                }
            }
            if (this.keyboardStates.isDownKeyDown) {
                var newPos = {
                    X: newPosition.X,
                    Y: newPosition.Y + (this.speed / tickLenght)
                };
                if (map.isValidPosition(newPos, this.size)) {
                    newPosition = newPos;
                }
            }
            if (this.keyboardStates.isLeftKeyDown) {
                var newPos = {
                    X: newPosition.X - (this.speed / tickLenght),
                    Y: newPosition.Y
                };
                if (map.isValidPosition(newPos, this.size)) {
                    newPosition = newPos;
                }
            }
            if (this.keyboardStates.isRightKeyDown) {
                var newPos = {
                    X: newPosition.X + (this.speed / tickLenght),
                    Y: newPosition.Y
                };
                if (map.isValidPosition(newPos, this.size)) {
                    newPosition = newPos;
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
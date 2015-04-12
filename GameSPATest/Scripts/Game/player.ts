import KeyboardStates = require("./KeyboardStates");
import KeyboardGroup = require("./KeyboardGroup");
import Map = require("./map");
import Team = require("./team");

class Player {

    static StartSize = <IGame.Size> { height: 10, width: 10 };

    currentPosition: IGame.Vector2D;
    color: string;
    team: Team.TeamEnum;
    size: IGame.Size;
    keyboardStates: KeyboardStates;

    speed: number = 250;
    
    constructor(startPos: IGame.Vector2D, keyboardGroup: KeyboardGroup, team: Team.TeamEnum) {
        this.currentPosition = startPos;
        this.team = team;
        this.color = this.setColor(team);
        this.size = Player.StartSize;

        this.keyboardStates = new KeyboardStates(keyboardGroup);
    }

    draw(ctx: CanvasRenderingContext2D, deltaTick: number) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.currentPosition.X, this.currentPosition.Y, this.size.width, this.size.height);
    }

    update(ctx: CanvasRenderingContext2D, map: Map, tickLenght: number) {
        var newPosition = this.currentPosition;

        if (this.keyboardStates.isUpKeyDown) {
            var newPos = <IGame.Vector2D> {
                X: newPosition.X,
                Y: newPosition.Y - (this.speed / tickLenght)
            };
            if (map.isValidPosition(newPos, this.size)) {
                newPosition = newPos;
            }
        }

        if (this.keyboardStates.isDownKeyDown) {
            var newPos = <IGame.Vector2D> {
                X: newPosition.X,
                Y: newPosition.Y + (this.speed / tickLenght)
            };
            if (map.isValidPosition(newPos, this.size)) {
                newPosition = newPos;
            }
        }

        if (this.keyboardStates.isLeftKeyDown) {
            var newPos = <IGame.Vector2D> {
                X: newPosition.X - (this.speed / tickLenght),
                Y: newPosition.Y
            };
            if (map.isValidPosition(newPos, this.size)) {
                newPosition = newPos;
            }
        }

        if (this.keyboardStates.isRightKeyDown) {
            var newPos = <IGame.Vector2D> {
                X: newPosition.X + (this.speed / tickLenght),
                Y: newPosition.Y
            };
            if (map.isValidPosition(newPos, this.size)) {
                newPosition = newPos;
            }
        }

        this.currentPosition = newPosition;
    }

    checkWinningCondition(map: Map) {
        switch (this.team) {
            case Team.TeamEnum.BLUE:
                return map.teamRedZone.isInBounds(this.currentPosition);
            case Team.TeamEnum.RED:
                return map.teamBlueZone.isInBounds(this.currentPosition);
            default:
                alert("checkWinningCondition - Team not found!");
        }
    }

    victoryMessage() {
        return Team.toString(this.team) + " won!";
    }

    private setColor(team: Team.TeamEnum) {
        switch (team) {
            case Team.TeamEnum.RED:
                return "red";
            case Team.TeamEnum.BLUE:
                return "blue";
            default:
                alert("Could not find team: " + team);
        }
    }

}
export = Player;
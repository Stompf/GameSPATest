import KeyboardStates = require("./KeyboardStates");
import KeyboardGroup = require("./KeyboardGroup");
import Map = require("./map");
import Team = require("./team");

class Player {

    static StartSize = <GameEntites.Size> { height: 10, width: 10 };

    currentPosition: GameEntites.Vector2D;
    color: string;
    team: Team.TeamEnum;
    size: GameEntites.Size;
    keyboardStates: KeyboardStates;

    isLocalPlayer: boolean;
    speed: number = 250;

    constructor(startPos: GameEntites.Vector2D, keyboardGroup: KeyboardGroup, team: Team.TeamEnum, isLocalPlayer: boolean) {
        this.currentPosition = startPos;
        this.team = team;
        this.color = this.setColor(team);
        this.size = Player.StartSize;
        this.isLocalPlayer = isLocalPlayer;

        this.keyboardStates = new KeyboardStates(keyboardGroup);
    }

    draw(ctx: CanvasRenderingContext2D, deltaTick: number) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.currentPosition.x, this.currentPosition.y, this.size.width, this.size.height);
    }

    update(ctx: CanvasRenderingContext2D, map: Map, tickLenght: number) {
        var newPosition = this.currentPosition;

        if (this.isLocalPlayer) {
            if (this.keyboardStates.isUpKeyDown) {
                var newPos = <GameEntites.Vector2D> {
                    x: newPosition.x,
                    y: newPosition.y - (this.speed / tickLenght)
                };
                if (map.isValidPosition(newPos, this.size)) {
                    newPosition = newPos;
                }
            }

            if (this.keyboardStates.isDownKeyDown) {
                var newPos = <GameEntites.Vector2D> {
                    x: newPosition.x,
                    y: newPosition.y + (this.speed / tickLenght)
                };
                if (map.isValidPosition(newPos, this.size)) {
                    newPosition = newPos;
                }
            }

            if (this.keyboardStates.isLeftKeyDown) {
                var newPos = <GameEntites.Vector2D> {
                    x: newPosition.x - (this.speed / tickLenght),
                    y: newPosition.y
                };
                if (map.isValidPosition(newPos, this.size)) {
                    newPosition = newPos;
                }
            }

            if (this.keyboardStates.isRightKeyDown) {
                var newPos = <GameEntites.Vector2D> {
                    x: newPosition.x + (this.speed / tickLenght),
                    y: newPosition.y
                };
                if (map.isValidPosition(newPos, this.size)) {
                    newPosition = newPos;
                }
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
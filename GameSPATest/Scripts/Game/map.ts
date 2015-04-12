import BoundingBox = require("./boundingBox");
import Player = require("./player");

class Map {

    size: IGame.Size;

    teamRedZone: BoundingBox;
    teamRedStartPosition: IGame.Vector2D;

    teamBlueZone: BoundingBox;
    teamBlueStartPosition: IGame.Vector2D;

    zoneWidth: number = 10;
    startPositionPadding: number = 30;

    constructor(size: IGame.Size) {
        this.size = size;
        this.initZones();
        this.initStartPositions();
    }

    render(ctx: CanvasRenderingContext2D, deltaTick: number) {
        this.renderZones(ctx);
    }

    isValidPosition(position: IGame.Vector2D, objectSize: IGame.Size) {
        return this.isInBounds(position, objectSize);
    }

    resetStartPositions(teamBluePosition: IGame.Vector2D, teamRedPosition: IGame.Vector2D) {
        teamBluePosition = this.teamBlueStartPosition;
        teamRedPosition = this.teamRedStartPosition;
    } 

    private isInBounds(position: IGame.Vector2D, objectSize: IGame.Size) {
        return position.X >= 0 &&
            position.X <= (this.size.width - objectSize.width) &&
            position.Y >= 0 && position.Y <= (this.size.height - objectSize.height) ;
    }

    private renderZones(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.teamRedZone.topLeft.X, this.teamRedZone.topLeft.Y, this.teamRedZone.bottomRight.X, this.teamRedZone.bottomRight.Y);

        ctx.fillStyle = "blue";
        ctx.fillRect(this.teamBlueZone.topLeft.X, this.teamBlueZone.topLeft.Y, this.teamBlueZone.bottomRight.X, this.teamBlueZone.bottomRight.Y);

    }

    private initStartPositions() {
        this.teamBlueStartPosition = <IGame.Vector2D> { X: this.size.width - this.startPositionPadding, Y: this.size.height / 2 };
        this.teamRedStartPosition = <IGame.Vector2D> { X: this.startPositionPadding - Player.StartSize.width, Y: this.size.height / 2 }; 
    }

    private initZones() {
        this.teamRedZone = new BoundingBox(<IGame.Vector2D> { X: 0, Y: 0 },
                                           <IGame.Vector2D> { X: this.zoneWidth, Y: this.size.height});

        this.teamBlueZone = new BoundingBox(<IGame.Vector2D> { X: this.size.width - this.zoneWidth, Y: 0 },
                                            <IGame.Vector2D> { X: this.size.width, Y: this.size.height });
    }
}
export = Map;
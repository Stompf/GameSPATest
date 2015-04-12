class BoundingBox {

    topLeft: IGame.Vector2D;
    bottomRight: IGame.Vector2D;

    constructor(topLeft: IGame.Vector2D, bottomRight: IGame.Vector2D) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }

    isInBounds(position: IGame.Vector2D) {
        return position.X >= this.topLeft.X &&
            position.X <= this.bottomRight.X &&
            position.Y >= this.topLeft.Y &&
            position.Y <= this.bottomRight.Y;
    }

}
export = BoundingBox;
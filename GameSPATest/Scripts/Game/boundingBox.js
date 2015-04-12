define(["require", "exports"], function (require, exports) {
    var BoundingBox = (function () {
        function BoundingBox(topLeft, bottomRight) {
            this.topLeft = topLeft;
            this.bottomRight = bottomRight;
        }
        BoundingBox.prototype.isInBounds = function (position) {
            return position.X >= this.topLeft.X && position.X <= this.bottomRight.X && position.Y >= this.topLeft.Y && position.Y <= this.bottomRight.Y;
        };
        return BoundingBox;
    })();
    return BoundingBox;
});
//# sourceMappingURL=boundingBox.js.map
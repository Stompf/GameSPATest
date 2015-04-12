define(["require", "exports", "./boundingBox", "./player"], function (require, exports, BoundingBox, Player) {
    var Map = (function () {
        function Map(size) {
            this.zoneWidth = 10;
            this.startPositionPadding = 30;
            this.size = size;
            this.initZones();
            this.initStartPositions();
        }
        Map.prototype.render = function (ctx, deltaTick) {
            this.renderZones(ctx);
        };
        Map.prototype.isValidPosition = function (position, objectSize) {
            return this.isInBounds(position, objectSize);
        };
        Map.prototype.resetStartPositions = function (teamBluePosition, teamRedPosition) {
            teamBluePosition = this.teamBlueStartPosition;
            teamRedPosition = this.teamRedStartPosition;
        };
        Map.prototype.isInBounds = function (position, objectSize) {
            return position.X >= 0 && position.X <= (this.size.width - objectSize.width) && position.Y >= 0 && position.Y <= (this.size.height - objectSize.height);
        };
        Map.prototype.renderZones = function (ctx) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.teamRedZone.topLeft.X, this.teamRedZone.topLeft.Y, this.teamRedZone.bottomRight.X, this.teamRedZone.bottomRight.Y);
            ctx.fillStyle = "blue";
            ctx.fillRect(this.teamBlueZone.topLeft.X, this.teamBlueZone.topLeft.Y, this.teamBlueZone.bottomRight.X, this.teamBlueZone.bottomRight.Y);
        };
        Map.prototype.initStartPositions = function () {
            this.teamBlueStartPosition = { X: this.size.width - this.startPositionPadding, Y: this.size.height / 2 };
            this.teamRedStartPosition = { X: this.startPositionPadding - Player.StartSize.width, Y: this.size.height / 2 };
        };
        Map.prototype.initZones = function () {
            this.teamRedZone = new BoundingBox({ X: 0, Y: 0 }, { X: this.zoneWidth, Y: this.size.height });
            this.teamBlueZone = new BoundingBox({ X: this.size.width - this.zoneWidth, Y: 0 }, { X: this.size.width, Y: this.size.height });
        };
        return Map;
    })();
    return Map;
});
//# sourceMappingURL=map.js.map
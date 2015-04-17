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
            return position.x >= 0 && position.x <= (this.size.width - objectSize.width) && position.y >= 0 && position.y <= (this.size.height - objectSize.height);
        };
        Map.prototype.renderZones = function (ctx) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.teamRedZone.topLeft.x, this.teamRedZone.topLeft.y, this.teamRedZone.bottomRight.x, this.teamRedZone.bottomRight.y);
            ctx.fillStyle = "blue";
            ctx.fillRect(this.teamBlueZone.topLeft.x, this.teamBlueZone.topLeft.y, this.teamBlueZone.bottomRight.x, this.teamBlueZone.bottomRight.y);
        };
        Map.prototype.initStartPositions = function () {
            this.teamBlueStartPosition = { x: this.size.width - this.startPositionPadding, y: this.size.height / 2 };
            this.teamRedStartPosition = { x: this.startPositionPadding - Player.StartSize.width, y: this.size.height / 2 };
        };
        Map.prototype.initZones = function () {
            this.teamRedZone = new BoundingBox({ x: 0, y: 0 }, { x: this.zoneWidth, y: this.size.height });
            this.teamBlueZone = new BoundingBox({ x: this.size.width - this.zoneWidth, y: 0 }, { x: this.size.width, y: this.size.height });
        };
        return Map;
    })();
    return Map;
});
//# sourceMappingURL=map.js.map
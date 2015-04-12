define(["require", "exports", "knockout", "./player", "./map", "./KeyboardGroup", "./Rendering", "./team", "toastr"], function (require, exports, ko, Player, Map, KeyboardGroup, Rendering, Team, toastr) {
    var Game = (function () {
        function Game(ctx) {
            var _this = this;
            this.lastTick = performance.now();
            this.tickLength = 50;
            this.main = function (tFrame) {
                _this.stopMain = window.requestAnimationFrame(_this.main);
                var nextTick = _this.lastTick + _this.tickLength;
                var numTicks = 0;
                if (tFrame > nextTick) {
                    var timeSinceTick = tFrame - _this.lastTick;
                    numTicks = Math.floor(timeSinceTick / _this.tickLength);
                }
                // console.log("num: " + numTicks);
                _this.queueUpdates(numTicks);
                _this.redrawCanvas(tFrame);
                _this.lastRender = tFrame;
            };
            this.currentPlayers = ko.observableArray();
            this.currentMap = ko.observable();
            this.gameOn = ko.observable();
            this.lastRender = this.lastTick;
            this.ctx = ctx;
            if (this.ctx != null) {
                this.initCanvas();
            }
            else {
                alert("Cannot find canvas!");
            }
        }
        Game.prototype.onKeyDown = function (e) {
            //  console.log("onKeyDown: " + e.keyCode);
            var players = this.currentPlayers();
            for (var i = 0; i < players.length; i++) {
                if (players[i].keyboardStates.keyDown(e.keyCode)) {
                    break;
                }
            }
        };
        Game.prototype.onKeyUp = function (e) {
            //console.log("onKeyUp: " + e.keyCode);
            var players = this.currentPlayers();
            for (var i = 0; i < players.length; i++) {
                if (players[i].keyboardStates.keyUp(e.keyCode)) {
                    break;
                }
            }
        };
        Game.prototype.queueUpdates = function (numTicks) {
            for (var i = 0; i < numTicks; i++) {
                this.lastTick = this.lastTick + this.tickLength;
                this.update(this.lastTick);
            }
        };
        Game.prototype.update = function (lastTick) {
            var _this = this;
            if (this.gameOn() === false) {
                return;
            }
            var players = this.currentPlayers();
            var map = this.currentMap();
            for (var i = 0; i < players.length; i++) {
                players[i].update(this.ctx, map, this.tickLength);
                var victory = players[i].checkWinningCondition(map);
                if (victory) {
                    window.cancelAnimationFrame(this.stopMain);
                    this.gameOn(false);
                    toastr.success(players[i].victoryMessage() + ' - New game in 5 secs');
                    setTimeout(function () {
                        _this.initPlayers();
                        _this.main(performance.now());
                        _this.gameOn(true);
                    }, 5000);
                    break;
                }
            }
        };
        Game.prototype.redrawCanvas = function (tFrame) {
            var deltaTick = tFrame - this.lastTick;
            Rendering.render(this.ctx, this.currentPlayers(), deltaTick, this.currentMap());
        };
        Game.prototype.initCanvas = function () {
            var _this = this;
            this.ctx.canvas.tabIndex = 1000;
            this.ctx.canvas.style.outline = "none";
            window.addEventListener("keydown", function (e) {
                _this.onKeyDown(e);
            }, false);
            window.addEventListener("keyup", function (e) {
                _this.onKeyUp(e);
            }, false);
            window.addEventListener('mousedown', function (e) {
            });
            this.initMap();
            this.initPlayers();
            this.main(performance.now());
            this.gameOn(true);
        };
        Game.prototype.initMap = function () {
            var size = {
                height: this.ctx.canvas.height,
                width: this.ctx.canvas.width
            };
            this.currentMap(new Map(size));
        };
        Game.prototype.initPlayers = function () {
            //Player 1
            var player1 = new Player(this.currentMap().teamBlueStartPosition, 0 /* WSAD */, 1 /* BLUE */);
            //Player 2
            var player2 = new Player(this.currentMap().teamRedStartPosition, 1 /* Arrows */, 0 /* RED */);
            this.currentPlayers([player1, player2]);
        };
        return Game;
    })();
    return Game;
});
//# sourceMappingURL=game.js.map
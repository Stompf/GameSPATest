import ko = require("knockout");
import Player = require("./player");
import Map = require("./map");
import KeyboardGroup = require("./KeyboardGroup");
import Rendering = require("./Rendering");
import Team = require("./team");
import toastr = require("toastr");

class Game {

    ctx: CanvasRenderingContext2D;

    currentPlayers: KnockoutObservableArray<Player>;
    currentMap: KnockoutObservable<Map>;
    gameOn: KnockoutObservable<boolean>;

    stopMain: number;
    lastRender: number;
    lastTick: number = performance.now();
    tickLength: number = 50;

    constructor(ctx: CanvasRenderingContext2D) {
        this.currentPlayers = ko.observableArray<Player>();
        this.currentMap = ko.observable<Map>();
        this.gameOn = ko.observable<boolean>();
        this.lastRender = this.lastTick;

        this.ctx = ctx;
        if (this.ctx != null) {
            this.initCanvas();
        } else {
            alert("Cannot find canvas!");
        }
    }

    onKeyDown(e: KeyboardEvent) {
        //  console.log("onKeyDown: " + e.keyCode);

        var players = this.currentPlayers();
        for (var i = 0; i < players.length; i++) {
            if (players[i].keyboardStates.keyDown(e.keyCode)) {
                break;
            }
        }
    }

    onKeyUp(e: KeyboardEvent) {
        //console.log("onKeyUp: " + e.keyCode);

        var players = this.currentPlayers();
        for (var i = 0; i < players.length; i++) {
            if (players[i].keyboardStates.keyUp(e.keyCode)) {
                break;
            }
        }
    }

    private main = (tFrame: number) => {
        this.stopMain = window.requestAnimationFrame(this.main);
        var nextTick = this.lastTick + this.tickLength;
        var numTicks = 0;

        if (tFrame > nextTick) {
            var timeSinceTick = tFrame - this.lastTick;
            numTicks = Math.floor(timeSinceTick / this.tickLength);
        }
        // console.log("num: " + numTicks);
        this.queueUpdates(numTicks);
        this.redrawCanvas(tFrame);
        this.lastRender = tFrame;
    }

    private queueUpdates(numTicks: number) {
        for (var i = 0; i < numTicks; i++) {
            this.lastTick = this.lastTick + this.tickLength;
            this.update(this.lastTick);
        }
    }

    private update(lastTick: number) {
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

                setTimeout(() => {
                    this.initPlayers();
                    this.main(performance.now());
                    this.gameOn(true);
                }, 5000);

                break;
            }
        }
    }

    private redrawCanvas(tFrame: number) {
        var deltaTick = tFrame - this.lastTick;
        Rendering.render(this.ctx, this.currentPlayers(), deltaTick, this.currentMap());
    }

    private initCanvas() {
        this.ctx.canvas.tabIndex = 1000;
        this.ctx.canvas.style.outline = "none";

        window.addEventListener("keydown", (e) => { this.onKeyDown(e); }, false);
        window.addEventListener("keyup", (e) => { this.onKeyUp(e); }, false);

        window.addEventListener('mousedown', (e: MouseEvent) => {

        });

        this.initMap();
        this.initPlayers();
        this.main(performance.now());

        this.gameOn(true);
    }

    private initMap() {
        var size = <IGame.Size>{
            height: this.ctx.canvas.height,
            width: this.ctx.canvas.width
        };
        this.currentMap(new Map(size));
    }

    private initPlayers() {
        //Player 1
        var player1 = new Player(this.currentMap().teamBlueStartPosition, KeyboardGroup.WSAD, Team.TeamEnum.BLUE);

        //Player 2
        var player2 = new Player(this.currentMap().teamRedStartPosition, KeyboardGroup.Arrows, Team.TeamEnum.RED);

        this.currentPlayers([player1, player2]);
    }
}
export = Game;
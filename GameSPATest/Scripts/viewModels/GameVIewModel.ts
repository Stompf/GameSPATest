import AppMain = require('../app/appMain');
import Game = require('../Game/game');

class GameViewModel {
    appMain: AppMain;
    game: Game;


    constructor(app: AppMain) {
        this.appMain = app;
    }

    activate() {
        this.game = new Game((<HTMLCanvasElement>document.getElementById("gameCanvas")).getContext("2d"));

    }

}
export = GameViewModel;
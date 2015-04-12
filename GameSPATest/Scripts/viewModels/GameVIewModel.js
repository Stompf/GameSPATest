define(["require", "exports", '../Game/game'], function (require, exports, Game) {
    var GameViewModel = (function () {
        function GameViewModel(app) {
            this.appMain = app;
        }
        GameViewModel.prototype.activate = function () {
            this.game = new Game(document.getElementById("gameCanvas").getContext("2d"));
        };
        return GameViewModel;
    })();
    return GameViewModel;
});
//# sourceMappingURL=GameVIewModel.js.map
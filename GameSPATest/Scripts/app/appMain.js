define(["require", "exports", 'knockout', 'jquery', './appComponent'], function (require, exports, ko, $, AppComponent) {
    var AppMain = (function () {
        function AppMain() {
            var _this = this;
            this.appComponents = ko.observableArray();
            this.selectedAppComponent = ko.observable();
            this.selectedAppComponent.subscribe(function (selectedComp) {
                _this.handleSelectedAppComponentChanged(selectedComp);
            });
            this.text = ko.observable('hej');
        }
        AppMain.prototype.activate = function () {
            ko.applyBindings(this);
            this.baseUrl = $('#baseURL').html();
            this.loadComponents();
        };
        AppMain.prototype.loadComponents = function () {
            var comp = new AppComponent('TietoEnkat', this.baseUrl + 'View/TietoEnkat', 'viewModels/TietoEnkat');
            this.appComponents.push(comp);
            this.selectedAppComponent(comp);
        };
        AppMain.prototype.handleSelectedAppComponentChanged = function (selectedComp) {
            var _this = this;
            if (!selectedComp) {
                return;
            }
            $('#selectedAppViewPort').empty();
            ko.cleanNode($('#selectedAppViewPort')[0]);
            $.ajax({
                url: selectedComp.htmlPath,
                contentType: 'application/html; charset=utf-8',
                type: 'GET',
                dataType: 'html'
            }).done(function (htmlresult) {
                require(['../' + selectedComp.jsPath], function (foundModule) {
                    var viewModel = new foundModule(_this);
                    $('#selectedAppViewPort').append(htmlresult);
                    ko.applyBindings(viewModel, $('#selectedAppViewPort')[0]);
                    setTimeout(function () {
                    }, 0);
                });
            }).fail(function (error) {
                $('#selectedAppViewPort').append(error.responseText);
            });
        };
        return AppMain;
    })();
    return AppMain;
});
//# sourceMappingURL=appMain.js.map
define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var TietoEnkat = (function () {
        function TietoEnkat(appMain) {
            var _this = this;
            this.raitingClicked = function (raiting) {
                _this.step02Text('Du har valt ' + raiting + '. Kommentera?');
                _this.currentStep(1);
            };
            this.incrementStep = function () {
                _this.currentStep(_this.currentStep() + 1);
            };
            this.decrementStep = function () {
                _this.currentStep(_this.currentStep() - 1);
            };
            this.reset = function () {
                _this.currentStep(0);
                _this.email(null);
                _this.comment(null);
            };
            this.appMain = appMain;
            this.currentStep = ko.observable(0);
            this.currentStep.subscribe(function (step) {
                _this.handleCurrentStepChanged(step);
            });
            this.comment = ko.observable();
            this.aboutText = ko.observable('Ange vad du tycker om Lifecare');
            this.step02Text = ko.observable();
            this.email = ko.observable();
            this.thankYou = ko.observable('Tack för din medverkan!');
        }
        TietoEnkat.prototype.handleCurrentStepChanged = function (step) {
            if (step < 0) {
                this.currentStep(0);
            }
            else if (step === 3) {
                this.registerUser();
            }
        };
        TietoEnkat.prototype.registerUser = function () {
            var requestObj = {
                comment: this.comment(),
                email: this.email()
            };
            $.ajax({
                url: this.appMain.baseUrl + 'Service/RegisterUser',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(requestObj),
                success: function (result) {
                    var h = result;
                },
                error: function (jqXHR, exception) {
                    alert('Error message.');
                }
            });
        };
        return TietoEnkat;
    })();
    return TietoEnkat;
});
//# sourceMappingURL=TietoEnkat.js.map
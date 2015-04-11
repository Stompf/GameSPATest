import ko = require('knockout');
import $ = require('jquery');
import AppComponent = require('./appComponent');

class AppMain {

    text: KnockoutObservable<string>;
    appComponents: KnockoutObservableArray<AppComponent>;
    selectedAppComponent: KnockoutObservable<AppComponent>;
    baseUrl: string;

    constructor() {
        this.appComponents = ko.observableArray<AppComponent>();
        this.selectedAppComponent = ko.observable<AppComponent>();
        this.selectedAppComponent.subscribe(selectedComp => {
            this.handleSelectedAppComponentChanged(selectedComp);
        });

        this.text = ko.observable('hej');
    }

    activate() {
        ko.applyBindings(this);
        this.baseUrl = $('#baseURL').html();

        this.loadComponents();
    }

    loadComponents() {
        var comp = new AppComponent('TietoEnkat', this.baseUrl + 'View/TietoEnkat', 'viewModels/TietoEnkat');
        this.appComponents.push(comp);
        this.selectedAppComponent(comp);
    }


    private handleSelectedAppComponentChanged(selectedComp: AppComponent) {
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
        }).done(htmlresult => {
            require(['../' + selectedComp.jsPath], (foundModule) => {
                var viewModel = new foundModule(this);
                $('#selectedAppViewPort').append(htmlresult);
                ko.applyBindings(viewModel, $('#selectedAppViewPort')[0]);
                setTimeout(() => {
    
                }, 0);
            })
        }).fail(error => {
            $('#selectedAppViewPort').append(error.responseText);
        });

    }

} 
export = AppMain;
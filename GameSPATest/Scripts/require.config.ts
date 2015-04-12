requirejs.config({
    paths: {
        'jquery': 'jquery-2.1.3.min',
        'knockout': 'knockout-3.3.0',
        'toastr': 'toastr.min',
        'moment': 'moment.min',
        'signalr': 'jquery.signalR-2.2.0.min',
        'signalr.hubs': '/signalr/hubs?'
    },
    shim: {
        "jquery": { exports: "$" },
        "signalr": { deps: ["jquery"] },
        "signalr.hubs": { deps: ["signalr"] }
    }
}); 

require(["app/appMain"], function (appMain) {
    var appMain = new appMain();
    appMain.activate();
});
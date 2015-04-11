requirejs.config({
    paths: {
        'jquery': 'jquery-2.1.3.min',
        'knockout': 'knockout-3.3.0'
    },
    shim: {
  /*      'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
*/        
    }
}); 

require(["app/appMain"], function (appMain) {
    var appMain = new appMain();
    appMain.activate();
});
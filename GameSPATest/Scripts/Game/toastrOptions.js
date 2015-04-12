define(["require", "exports", "toastr"], function (require, exports, toastr) {
    var ToastrOptions;
    (function (ToastrOptions) {
        toastr.options = {
            closeButton: false,
            debug: false,
            positionClass: "toast-bottom-right",
            onclick: null,
            showDuration: 300,
            hideDuration: 1000,
            timeOut: 5000,
            extendedTimeOut: 1000,
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        };
    })(ToastrOptions || (ToastrOptions = {}));
    return ToastrOptions;
});
//# sourceMappingURL=toastrOptions.js.map
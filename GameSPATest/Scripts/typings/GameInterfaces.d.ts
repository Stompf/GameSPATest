declare module IGame {
    interface Vector2D {
        X: number;
        Y: number;
    }

    interface Size {
        height: number;
        width: number;
    }
}

declare module 'toastr' {
    export = toastr;
}

declare var signalr: any;
declare module 'signalr.hubs' {
    export = signalr;
}
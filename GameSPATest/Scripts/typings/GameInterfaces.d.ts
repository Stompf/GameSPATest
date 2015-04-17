declare module 'toastr' {
    export = toastr;
}

declare var signalr: any;
declare module 'signalr.hubs' {
    export = signalr;
}

interface MyHubClient {
    newGameStart(obj: GameEntites.NewGameStartEntity): void
	endGame(message: string): void;
}

interface MyHubServer {
	searchForGame(): void;
}

interface MyHub {
	client: MyHubClient;
	server: MyHubServer;
}

interface SignalR {
	myHub: MyHub;
}
interface MyHubClient {
    newGameStart(obj: GameEntites.NewGameStartEntity): void
	endGame(message: string): void;
	initGame(obj: GameEntites.InitGameEntity): void;
}

interface MyHubServer {
	searchForGame(): void;
	sendReady(): void;
}

interface MyHub {
	client: MyHubClient;
	server: MyHubServer;
}

interface SignalR {
	myHub: MyHub;
}

declare module 'toastr' {
    export = toastr;
}

declare var signalr: any;
declare module 'signalr.hubs' {
    export = signalr;
}

 
 

 

/// <reference path="Enums.ts" />

declare module SPATest.Controllers.ServiceController {
	interface RequestRegisterUser {
		email: string;
		comment: string;
	}
	interface RequestRemoveUser {
		id: string;
	}
}



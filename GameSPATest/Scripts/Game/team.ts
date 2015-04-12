module Team {
    export enum TeamEnum {
        RED,
        BLUE
    }

    export function toString(team: TeamEnum) {
        switch (team) {
            case TeamEnum.RED:
                return "Team Red";
            case TeamEnum.BLUE:
                return "Team Blue";
            default:
                return "undefined";
        }
    }
}
export = Team;
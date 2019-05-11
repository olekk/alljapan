export enum MatchStatusEnum {
    LIVE,
    UPCOMING,
    FINISHED,
}

export interface IPlayer {
    firstName: string;
    lastName: string;
    countryCode: string;
}

export interface ITeam {
    player1: IPlayer;
    player2?: IPlayer;
}

export interface IScore {
    sets: string[];
    score?: number;
}
export interface IMatch {
    status: MatchStatusEnum;
    teamA: ITeam;
    teamB: ITeam;
    scoreA: IScore;
    scoreB: IScore;
    courtId: number;
    courtName: string;
    dateTime: string;
    stats: string;
    eventName: string;
    matchName: string;
    isTeamAServing: boolean;
    isTeamBServing: boolean;
}

export interface IDay {
    dayId: number;
    dataTime: string;
    pathToFile: string;
    name: string;

}
export interface ITournamentConfig {
    days: IDay[];
    refresh?: number;
}

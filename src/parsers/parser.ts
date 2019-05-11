import * as React from 'react';
import {
    IDay,
    IMatch,
    ITournamentConfig,
    MatchStatusEnum,
} from '../model';

export let parsedMatches: IMatch[] = [];
export let DataContext = React.createContext(parsedMatches);

export function getTournamentDays(TournamentConfigJsonFile: any) {
    const TournamentConfig: ITournamentConfig = {
        days: [],
    };
    TournamentConfigJsonFile.days.forEach((currentDay: any) => {
        const day: IDay = {
            dataTime: currentDay.date,
            dayId: parseInt(currentDay.dId, 10),
            name: currentDay.name,
            pathToFile: currentDay.path,
        };
        TournamentConfig.days.push(day);
    });
    return (TournamentConfig.days);
}

export function getTournamentDayMatches(dayJsonFile: any): IMatch[] {
    for (const id in dayJsonFile.matches) {
        if (dayJsonFile.matches.hasOwnProperty(id)) {
            const currentMatch = {
                courtId: parseInt(dayJsonFile.matches[id].cId, 10),
                courtName: dayJsonFile.matches[id].cN,
                dateTime: '0',
                eventName: dayJsonFile.matches[id].eN,
                isTeamAServing: JSON.parse(dayJsonFile.matches[id].sA),
                isTeamBServing: JSON.parse(dayJsonFile.matches[id].sB),
                matchName: dayJsonFile.matches[id].mN,
                scoreA: {
                    score: 0,
                    sets: [dayJsonFile.matches[id].s1A, dayJsonFile.matches[id].s2A, dayJsonFile.matches[id].s3A],
                },
                scoreB: {
                    score: 0,
                    sets: [dayJsonFile.matches[id].s1B, dayJsonFile.matches[id].s2B, dayJsonFile.matches[id].s3B],
                },
                stats: dayJsonFile.matches[id].st,
                status: MatchStatusEnum.UPCOMING,
                teamA: {
                    player1: {
                        countryCode: dayJsonFile.matches[id].tA.p1.cc,
                        firstName: dayJsonFile.matches[id].tA.p1.fN,
                        lastName: dayJsonFile.matches[id].tA.p1.lN,
                    },
                    player2: {
                        countryCode: dayJsonFile.matches[id].tA.p2.cc,
                        firstName: dayJsonFile.matches[id].tA.p2.fN,
                        lastName: dayJsonFile.matches[id].tA.p2.lN,
                    },
                },
                teamB: {
                    player1: {
                        countryCode: dayJsonFile.matches[id].tB.p1.cc,
                        firstName: dayJsonFile.matches[id].tB.p1.fN,
                        lastName: dayJsonFile.matches[id].tB.p1.lN,
                    },
                    player2: {
                        countryCode: dayJsonFile.matches[id].tB.p2.cc,
                        firstName: dayJsonFile.matches[id].tB.p2.fN,
                        lastName: dayJsonFile.matches[id].tB.p2.lN,
                    },
                },
            };
            if (dayJsonFile.matches[id].pA === '' && dayJsonFile.matches[id].pB === '') {
                currentMatch.status = MatchStatusEnum.UPCOMING;
            } else if (!isNaN(dayJsonFile.matches[id].pA) && !isNaN(dayJsonFile.matches[id].pB)) {
                currentMatch.status = MatchStatusEnum.LIVE;
                currentMatch.scoreA.score = dayJsonFile.matches[id].pA;
                currentMatch.scoreB.score = dayJsonFile.matches[id].pB;
            } else {
                currentMatch.status = MatchStatusEnum.FINISHED;
            }
            for (let i = 0; i < currentMatch.scoreA.sets.length; i++) {
                if (currentMatch.scoreA.sets[i].length > 1) {
                    currentMatch.scoreA.sets[i] = currentMatch.scoreA.sets[i].replace(`(` , '');
                    currentMatch.scoreA.sets[i] = currentMatch.scoreA.sets[i].replace(`)` , '');
                } if (currentMatch.scoreB.sets[i].length > 1) {
                   currentMatch.scoreB.sets[i] = currentMatch.scoreB.sets[i].replace(`(` , '');
                   currentMatch.scoreB.sets[i] = currentMatch.scoreB.sets[i].replace(`)` , '');
               } else if (currentMatch.scoreA.sets[i] !== '') {
                    currentMatch.scoreA.sets[i] = parseInt(currentMatch.scoreA.sets[i], 10);
                    currentMatch.scoreB.sets[i] = parseInt(currentMatch.scoreB.sets[i], 10);
                } else {
                    currentMatch.scoreA.sets.splice(i, 1);
                    currentMatch.scoreB.sets.splice(i, 1);
                    i = 0;
                }
            }
            if (currentMatch.teamA.player2.firstName === '') {
                delete currentMatch.teamA.player2;
                delete currentMatch.teamB.player2;
            }
            dayJsonFile.matches.splice(id, 1, currentMatch);

        }
    }
    parsedMatches = dayJsonFile.matches;
    DataContext = React.createContext(parsedMatches);
    // tslint:disable-next-line:no-console
    console.log(parsedMatches);
    window.dispatchEvent(new Event('resize'));
    return (dayJsonFile.matches);
}
// export async function getJsonFile(path: string) {
//     return fetch(path).then((r) => r.json().then((obj) => (obj.matches)));
// }
export async function importJsonToParser(path: string) {
fetch(path)
  .then((response) => {
    return response.json();
}).then((myJson) => {
    return getTournamentDayMatches(myJson);
  });
}

// import {
//     importJsonToParser,
//     parsedMatches,
// } from '../parsers/parser';

// export let DataContext:  = {[matchTest]};
// console.log(importJsonToParser('/Scores/06_05.json'));
// setTimeout(() => {
//     DataContext = React.createContext(parsedMatches);
// }, 1000);

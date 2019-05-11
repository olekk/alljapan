import * as React from 'react';

import { CourtsContext } from './CourtsContext';
import { MatchTable } from './MatchTable';
import { NavbarDay } from './NavbarDay';
import { NavbarLogo } from './NavbarLogo';

import * as _ from 'lodash';

import './../assets/styles/style.scss';
import { NavbarCourt } from './NavbarCourt';

import liveMatches from '../../Scores/live.json';
import TournamentDays from '../data/tournamentConfig.json';

import {IDay, IMatch} from '../model';
import { getTournamentDayMatches, getTournamentDays } from '../parsers/parser';

getTournamentDayMatches(liveMatches);
import { DataContext, parsedMatches } from '../parsers/parser';

// COURTS ARRAY START
let courtArray: string[] = [];
parsedMatches.forEach((el: IMatch) => {courtArray.push(el.courtName); });
courtArray = _.uniq(courtArray).sort();
// COURTS ARRAY END

const daysArray: IDay[] = getTournamentDays(TournamentDays);
interface IMatchesPageState {
    arrayOfCourts: string[];
}
export class MatchesPage extends React.Component <{}, IMatchesPageState> {
    public state: IMatchesPageState = {
        arrayOfCourts: [''],
    };

    public handleChangeCourt = (arrayOfCourts: string[]) => {
        this.setState({arrayOfCourts});
    }

    public render() {
        const { Provider } = CourtsContext;
        return (
        <>
            <header>
                <NavbarLogo />
                <NavbarDay
                    allDays={daysArray}
                    choosenDay={daysArray[0]}
                />
                <NavbarCourt
                    courts={courtArray}
                    handleChangeCourt={(arrayOfCourts: string[]) => this.handleChangeCourt(arrayOfCourts)}
                />
            </header>
            {/* <div>
                <div>
                    Calendar
                </div>
                <div>Courts</div>
            </div> */}
            <div id="table-container">
                <Provider value={this.state.arrayOfCourts}>
                    <DataContext.Consumer>
                        {(matches) => <MatchTable matches={matches} />}
                    </DataContext.Consumer>
                </Provider>
            </div>
        </>
    );
        }
}

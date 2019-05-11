import * as React from 'react';

import {IDay} from '../model';

// import { identifier } from '@babel/types';

interface INavbarDayListprops {
    allDays: IDay[];
    choosenDay: IDay;
    handleClick(someDay: IDay): void;
}

export class NavbarDayList extends React.Component<INavbarDayListprops> {
    public constructor(props: INavbarDayListprops) {
        super(props);
        this.state = {
            allDays: this.props.allDays,
            choosenDay: this.props.choosenDay,
        };
    }
    public render() {
        return (
        <React.Fragment>

            {this.props.allDays.map((day: IDay) => (
                <li
                    key={day.dayId}
                    className={this.props.choosenDay === day ? 'choosen-navbar-day-element navbar-day-elements' : 'navbar-day-elements'}
                    onClick={(someDay) => this.props.handleClick(day)}
                >
                    {day.name}
                </li>))
            }

        </React.Fragment>
        );
    }
}

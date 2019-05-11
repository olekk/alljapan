import * as React from 'react';

import {IDay} from '../model';

import classNames from 'classNames';

import { NavbarDayList } from './NavbarDayList';

interface IArrowsProps {
    daysArray: IDay[];
    choosenDay: IDay;
    handleDaysChange(value: number): void;
    handleClick(someDay: IDay): void;
}

export class Arrows extends React.Component<IArrowsProps> {
    public constructor(props: IArrowsProps) {
        super(props);
        this.state = {
            choosenDay: this.props.choosenDay,
            daysArray: this.props.daysArray,
        };
    }
    public render() {
        return (
        <React.Fragment>
            <i
                onClick={() => { this.props.handleDaysChange(-1); }}
                className={classNames('fas change-day fa-caret-left') }
            />

            <NavbarDayList
                allDays={this.props.daysArray}
                choosenDay={this.props.choosenDay}
                handleClick={(someDay: IDay) => this.props.handleClick(someDay)}
            />

            <i
                onClick={() => { this.props.handleDaysChange(1); }}
                className={classNames('fas change-day fa-caret-right') }
            />
        </React.Fragment>
        );
    }
}

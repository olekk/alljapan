import * as React from 'react';
import { animated, Transition } from 'react-spring/renderprops.cjs';
import { importJsonToParser, parsedMatches } from '../parsers/parser';
import { IMatch } from './../model';
import { Listener } from './Listener';
import { Arrows } from './NavbarArrows';
import { NavbarDayList } from './NavbarDayList';

import classNames from 'classNames';

import { IDay } from '../model';

interface INavbarDayState {
    allDays: IDay[];
    visibleDays: number[];
    choosenDay: IDay;
    browserWidth: number;
    wrapperVisibility: boolean;
}

interface INavbarDayProps {
    allDays: IDay[];
    choosenDay: IDay;
}

export class NavbarDay extends React.Component<INavbarDayProps, INavbarDayState> {
    constructor(props: INavbarDayProps) {
        super(props);
        this.state = {
            allDays: this.props.allDays,
            browserWidth: window.innerWidth,
            choosenDay: this.props.choosenDay,
            visibleDays: [0, 8],
            wrapperVisibility: false,
        };
        this.handleListVisibility = this.handleListVisibility.bind(this);
    }

    public handleClick(day: IDay) {
        this.setState({choosenDay: day, wrapperVisibility: false});
        const path = '/Scores' + day.pathToFile;
        importJsonToParser(path);
        // updateCourts(parsedMatches);
    }

    public handleListVisibility(): void {
        this.setState( (prevState) => ({ wrapperVisibility: !prevState.wrapperVisibility}));
    }

    public handleDaysChange(value: number): void {
        if ((value === -1 && this.state.visibleDays[0] !== 0) || (value === 1 && this.state.visibleDays[1] < this.state.allDays.length)) {
            this.setState( (prevState) => ({
                visibleDays: [prevState.visibleDays[0] += value,
                prevState.visibleDays[1] += value],
            }));
        }
    }

    public onWindowResize() {
        this.setState( (prevState: INavbarDayState) => ({
             ...prevState,
             browserWidth: window.innerWidth,
        }));
        if (this.state.browserWidth < 1100) {
         this.setState( (prevState) => ({
             visibleDays: [prevState.visibleDays[0],
             prevState.visibleDays[0] + 4],  // dla < 1100 widoczne 4 elementy
         }));
        } else if (this.state.browserWidth < 1400) {
         this.setState( (prevState) => ({
             visibleDays: [prevState.visibleDays[0],
             prevState.visibleDays[0] + 5],  // etc.
         }));
        } else {
         this.setState( (prevState) => ({
             visibleDays: [prevState.visibleDays[0],
             prevState.visibleDays[0] + 7],
         }));
        }
       }

    public render() {
        const { choosenDay, browserWidth, allDays , wrapperVisibility, visibleDays} = this.state;
        return (
            <>
                <Listener event="DOMContentLoaded" callback={() => this.onWindowResize()} />
                <Listener event="resize" callback={() => this.onWindowResize()} />
                {browserWidth > 850 ?
                    <>
                        <ul className="navbar-day">
                            <Arrows
                                daysArray={[allDays[0]].concat(allDays.slice(visibleDays[0] + 1, visibleDays[1]))}
                                choosenDay={choosenDay}
                                handleDaysChange={(value: number) => this.handleDaysChange(value)}
                                handleClick={(someDay: IDay) => this.handleClick(someDay)}
                            >
                            </Arrows>
                        </ul>

                    </>
                    :
                    <>
                            <div onClick={this.handleListVisibility} className="mobile-open-day-holder">
                                <i className="fas menu-icon fa-list-ul" />
                                <span className="mobile-choosen-day-name">
                                    {choosenDay.name }</span>
                            </div>
                        <Transition
                            items={wrapperVisibility}
                            from={{ left: '-100%' }}
                            enter={{ left: '0%' }}
                            trail={50}
                            leave={{left: '-100%' }}
                        >
                            {(show)  => show && ((props) => (
                                <animated.div style={props} className="wrapper">
                                    <div className="navbar-day-wrapper">
                                        <div className="mobile-day-list-header">
                                            <span>Choose Day</span>
                                            <i className="fas fa-times-circle"
                                            onClick={() => this.handleClick(choosenDay)}
                                                                    />
                                        </div>
                                        <ul className="navbar-day">
                                            <NavbarDayList
                                                allDays={allDays}
                                                choosenDay={choosenDay}
                                                handleClick={(someDay: IDay) => this.handleClick(someDay)}
                                            />
                                        </ul>
                                    </div>
                                </animated.div>
                            ))}
                        </Transition>
                    </>
                }
            </>
        );
    }

}

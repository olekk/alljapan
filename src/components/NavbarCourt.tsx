import * as React from 'react';

import classNames from 'classnames';
import * as _ from 'lodash';

import { Listener } from './Listener';

interface INavbarCourtState {
  courts: string[];
  visibleItemsCount: number;
  currentIndex: number;
}

interface INavbarCourtProps {
  courts: string[];
  handleChangeCourt(arrayOfCourts: string[]): void;
}

export class NavbarCourt extends React.Component<
  INavbarCourtProps,
  INavbarCourtState
> {
  public constructor(props: INavbarCourtProps) {
    super(props);
    this.state = {
      courts: this.props.courts,
      currentIndex: 0,
      visibleItemsCount: this.getVisibleItemsCount(),
    };
  }
  public componentDidMount() {
    this.props.handleChangeCourt(this.getVisibleCourts());
  }

  public render() {
    return (
      <div className="court-holder">
        <Listener event="resize" callback={() => this.onWindowResize()} />
        <i
          onClick={() => this.moveCourtBy(-1)}
          className={classNames('fas change-court fa-caret-left', { disabled: !this.canMoveCourtBy(-1) })}
        />
        <div className="courts">
          {this.getVisibleCourts().map((courtName: string, key: number) => <div key={key} className="court">{courtName}</div>)}
        </div>
        <i
          onClick={() => this.moveCourtBy(1)}
          className={classNames('fas change-court fa-caret-right', { disabled: !this.canMoveCourtBy(1) })}
        />
      </div>
    );
  }

  private moveCourtBy(value: number) {
    const { courts, visibleItemsCount, currentIndex } = this.state;
    const newCurrentIndex = this.getCurrentIndex(currentIndex + value, courts.length - visibleItemsCount);
    if (this.canMoveCourtBy(value)) {
      this.setState({currentIndex: newCurrentIndex});
      this.props.handleChangeCourt(courts.slice(currentIndex + value, (currentIndex + value) + visibleItemsCount));
    }
  }

  private canMoveCourtBy(value: number) {
    const { courts, visibleItemsCount, currentIndex } = this.state;
    const targetValue = currentIndex + value;
    return (
      value < 0 ? targetValue >= 0 : targetValue <= courts.length - visibleItemsCount
    );
  }
  private getVisibleCourts() {
    const { courts, visibleItemsCount, currentIndex } = this.state;
    return courts.slice(currentIndex, currentIndex + visibleItemsCount);
  }
  private getCurrentIndex(value: number, maxValue: number) {
    return Math.min(Math.max(0, value), maxValue);
  }

  private onWindowResize() {
    this.setState({
      visibleItemsCount: this.getVisibleItemsCount(),
    }, () => {
      this.moveCourtBy(0);
    });
  }

  private getVisibleItemsCount() {
    const w = window.innerWidth;
    switch (true) {
      case w > 1900:
        return 4;
      case w > 1300:
        return 3;
      case w > 850:
        return 2;
      default:
        return this.props.courts.length;
      }
  }
}

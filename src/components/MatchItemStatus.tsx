import * as React from 'react';
import { MatchStatusEnum } from '../model';
import { MatchStatus } from './MatchStatus';

interface IMatchItemStatusProps {
    status: MatchStatusEnum;
    courtName: string;
}

export const MatchItemStatus: React.SFC<IMatchItemStatusProps> = ({status, courtName}: IMatchItemStatusProps) => {
    let statusClass: string = '';
    if (status === MatchStatusEnum.LIVE) {
        statusClass += 'status-live';
    } else if (status === MatchStatusEnum.UPCOMING) {
        statusClass += 'status-upcoming';
    }
    return (
        <div className="match-item-top-wrapper">
        <div className={`clippy-background ${statusClass}`}></div>
        <div className={`match-item-court ${status !== MatchStatusEnum.LIVE ? 'mobile-court-view' : ''}`}>
            {courtName}
        </div>
            <MatchStatus status={status}/>
        </div>
    );
};
MatchItemStatus.displayName = 'MatchItemStatus';

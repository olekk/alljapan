import * as React from 'react';
import { MatchStatusEnum } from '../model';

interface IMatchStatusProps {
    status: MatchStatusEnum;
}
const statusMap = { [MatchStatusEnum.LIVE]: 'Live', [MatchStatusEnum.FINISHED]: 'Result', [MatchStatusEnum.UPCOMING]: 'Upcoming' };
export const MatchStatus: React.SFC<IMatchStatusProps> = ({status}: IMatchStatusProps) => {
    return <div className={`match-status ${statusMap[status]}`}>{statusMap[status]}</div>;
};

MatchStatus.displayName = 'MatchStatus';

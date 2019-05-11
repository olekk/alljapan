import * as React from 'react';
import { IMatch } from './../model';

import { map } from 'lodash';
import { ITeam, MatchStatusEnum } from '../model';
import { LiveScores } from './LiveScores';
import { MatchItemStatus } from './MatchItemStatus';
import { Result } from './Result';

import { TeamInfo } from './TeamInfo';

interface IMatchItemProps {
    match: IMatch;
}

export const MatchItem: React.SFC<IMatchItemProps> = ({match}: IMatchItemProps) => {

    const [teamA, teamB] = map([match.teamA, match.teamB],
    (team: ITeam) => (<TeamInfo team={team} status={match.status} />));
    return (
        <div className={`match-item-wrapper ${match.status === MatchStatusEnum.LIVE && 'wrapper-live' }
        ${match.status === MatchStatusEnum.UPCOMING && 'wrapper-upcoming' }`}>
            <MatchItemStatus status={match.status} courtName={match.courtName}/>
            <div className={`${match.status === MatchStatusEnum.LIVE && 'live-item-info' } match-item-info`}>
                <div className="team-infoA">
                    {teamA}
                </div>
                <LiveScores scoreA={match.scoreA} scoreB={match.scoreB} status={match.status}/>
                <div className={`team-infoB ${match.status === MatchStatusEnum.FINISHED  && 'lost' }`}>
                    {teamB}
                </div>
                {match.status === MatchStatusEnum.FINISHED && <Result scoreA={match.scoreA} scoreB={match.scoreB} /> }
            </div>
        </div>
    );
};
MatchItem.displayName = 'MatchItem';

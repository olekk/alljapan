import * as React from 'react';
import { IScore, MatchStatusEnum } from '../model';
import { ScoreTeam } from './ScoreTeam';

interface ILiveScoresProps {
    scoreA: IScore;
    scoreB: IScore;
    status: MatchStatusEnum;
}

export const LiveScores: React.SFC<ILiveScoresProps> = ({ status, scoreA, scoreB }: ILiveScoresProps) => {
    const scoresA: any[] = scoreA.sets.map((set: any) => ( set + ` / `  ));
    const scoresB: any[] = scoreB.sets.map((set: any) => ( set + ` / `  ));

    return( status === MatchStatusEnum.LIVE ?
            <div className="live-match-scores">
               <ScoreTeam score={scoreA} scores={scoresA} className="stripA" />
               <ScoreTeam score={scoreB} scores={scoresB} className="stripB"/>
            </div> : <div className="beat">{status === MatchStatusEnum.UPCOMING ? 'versus' : 'beat'}</div>
            );
};

LiveScores.displayName = 'LiveScores';

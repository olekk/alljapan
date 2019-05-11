import * as React from 'react';
import { IScore, MatchStatusEnum } from '../model';

interface IScoreTeamProps {
    score: IScore;
    scores: string[];
    className: string;
}

export const ScoreTeam: React.SFC<IScoreTeamProps> = ({ score, scores, className }: IScoreTeamProps) => {

    return(
            <div className="score-team">
                <div className={`left-${className}`}></div>
                <div className="scores">{scores} <span className="bold">{score.score}</span></div>
                <div className={`right-${className}`}></div>
            </div>
            );
};

ScoreTeam.displayName = 'ScoreTeam';

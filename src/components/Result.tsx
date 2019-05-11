import * as React from 'react';
import { IScore } from '../model';

interface IResultProps {
    scoreA: IScore;
    scoreB: IScore;
}

export const Result: React.SFC<IResultProps> = ({ scoreA, scoreB }: IResultProps) => {

    const result: any = [];
    for (let i = 0; i <= scoreA.sets.length - 1; i++) {
        if (scoreA.sets[i].length > 1) {
            result.push(scoreA.sets[i][0]);
            result.push(<sup>{scoreA.sets[i][1]}</sup>);
            result.push(`/`);
            result.push(scoreB.sets[i]);
        } else if (scoreB.sets[i].length > 1) {
            result.push(scoreB.sets[i][0]);
            result.push(<sup>{scoreB.sets[i][1]}</sup>);
            result.push(`/`);
            result.push(scoreA.sets[i]);
        } else {
            result.push(scoreA.sets[i]);
            result.push(`/`);
            result.push(scoreB.sets[i]);
            result.push(' ');
    }
    }
    return <div className="match-item-result">{result}</div>;

};
Result.displayName = 'Result';

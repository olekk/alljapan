import * as React from 'react';
import { IMatch } from './../model';
import { MatchItem } from './MatchItem';

interface IMatchTableColumnProps {
    matches: IMatch[];
    courtName: string;
}

export const MatchTableColumn: React.SFC<IMatchTableColumnProps> = (props: IMatchTableColumnProps) => {
    return (
        <div>
            <div className="column"> {props.matches.map((match, key) => <MatchItem match={match} key={key}/> )}</div>
        </div>
    );
};

MatchTableColumn.displayName = 'MatchTableColumn';

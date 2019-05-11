import { groupBy, map } from 'lodash';
import * as React from 'react';
import { IMatch } from './../model';
import { MatchTableColumn } from './MatchTableColumn';

import { CourtsContext } from './CourtsContext';

interface IMatchTableProps {
    matches: IMatch[];
}

export const MatchTable = (props: IMatchTableProps) => {

    const grouped = groupBy(props.matches, 'courtName');
    const columns = map(
        grouped,
        (matches, courtName) => (
         <MatchTableColumn  key={courtName} matches={matches} courtName={courtName} />
        ),
    );
    const { Consumer } = CourtsContext;
    return (
        <Consumer>
            {(arrayOfCourts) => columns.filter((el) => (arrayOfCourts.find((name) => (name === el.key) )))}
        </Consumer>
    );
};

MatchTable.displayName = 'MatchTable';

import * as React from 'react';

import { isNil } from 'lodash';
import { ITeam, MatchStatusEnum } from '../model';
import { PlayerInfo } from './PlayerInfo';

interface ITeamInfoProps {
    team: ITeam;
    status: MatchStatusEnum;
}

export const TeamInfo: React.SFC<ITeamInfoProps> = ({team: {player1, player2}, status}: ITeamInfoProps) => {
    return (
        <>
            <PlayerInfo hasPartner={!isNil(player2)} player={player1} status={status} />
            {!isNil(player2) && <PlayerInfo hasPartner player={player2} status={status} />}
        </>
    );
};
TeamInfo.displayName = 'TeamInfo';

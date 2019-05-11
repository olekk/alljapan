import * as React from 'react';

import { isNil } from 'lodash';
import { IPlayer, MatchStatusEnum } from '../model';

interface IPlayerInfoProps {
    player: IPlayer;
    status: MatchStatusEnum;
    hasPartner: boolean;
}

export const PlayerInfo: React.SFC<IPlayerInfoProps> = ({player, status, hasPartner}: IPlayerInfoProps) => {
    return (
        <div className={`player-info ${(status === MatchStatusEnum.LIVE && !hasPartner) && 'player-info-live' }`}>
            <div className="player-name">
                <span className="first-name">{player.firstName}</span>
                &nbsp;{(!hasPartner && status !== MatchStatusEnum.LIVE) && <br/>}
                <span className="last-name bold">{player.lastName}</span>
            </div>
            <div className="country-code">{player.countryCode}</div>
        </div>
    );
};
PlayerInfo.displayName = 'PlayerInfo';

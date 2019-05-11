import * as React from 'react';

import img from '../assets/img/header-upgradedv2.png';

export const NavbarLogo: React.SFC = () => {
    return(
        <div className="header-logo">
            <img src={img} className="logo" />
        </div>
    );
};
NavbarLogo.displayName = 'NavbarLogo';

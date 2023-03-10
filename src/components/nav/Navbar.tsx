import React from 'react';
import DesktopNav from '../../feature/navbar/DesktopNav';
import MobileNav from '../../feature/navbar/MobileNav';
import KladenjeUzivoSubNav from './subNav/KladenjeUzivoSubNav';
import SportskoKladjenjeSubNav from './subNav/SportskoKladjenjeSubNav';
import { useAppSelector } from '../../redux/hooks';

const Navbar = () => {

    const { navigationState } = useAppSelector((state) => state.navigation)

    return (
        <div>
            <DesktopNav />
            <MobileNav />

            {navigationState === "sportsko-kladjenje" && <SportskoKladjenjeSubNav />}

            {navigationState === "kladjenje-uzivo" && <KladenjeUzivoSubNav />}
        </div>
    );
}

export default Navbar;
import React from 'react';
import DesktopNav from '../../feature/navbar/DesktopNav';
import MobileNav from '../../feature/navbar/MobileNav';
import KladenjeUzivoSubNav from './KladenjeUzivoSubNav';
import SportskoKladjenjeSubNav from './SportskoKladjenjeSubNav';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Navbar = () => {

    const { navigationState } = useAppSelector((state) => state.navigation)
    // const dispatch = useAppDispatch();

    console.log("navigationState: ", navigationState)
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
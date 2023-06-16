import React from 'react'
import MobileTicket from "./MobileTicket";
import DesktopTicket from './DesktopTicket';

const Ticket = () => {
    return (
        <>
            <div className="lg:hidden">
                <MobileTicket />
            </div>
            <div className="hidden lg:block">
                <DesktopTicket />
            </div>
        </>
    );
}

export default Ticket;
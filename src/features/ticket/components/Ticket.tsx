import React from 'react'
import MobileTicket from "./MobileTicket";
import DesktopTicket from './DesktopTicket';

const Ticket = () => {
    return (
        <>
            <div className="xl:hidden">
                <MobileTicket />
            </div>
            <div className="hidden xl:block ">
                <DesktopTicket />
            </div>
        </>
    );
}

export default Ticket;
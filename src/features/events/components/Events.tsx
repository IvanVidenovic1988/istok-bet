import React from 'react'
import DesktopEvents from './DesktopEvents'
import MobileEvents from './MobileEvents'
import TabletEvents from './TabletEvents'


const Events = () => {
    return (
        <>
            <div className="md:hidden pt-[185px] pr-2">
                <MobileEvents />
            </div>
            <div className="hidden md:block 2xl:hidden pt-[185px] pr-2">
                <TabletEvents />
            </div>
            <div className="hidden 2xl:block pt-[185px]">
                <DesktopEvents />
            </div>
        </>
    )
}

export default Events
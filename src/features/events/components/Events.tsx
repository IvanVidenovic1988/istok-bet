import React from 'react'
import DesktopEvents from './DesktopEvents'
import MobileEvents from './MobileEvents'

const Events = () => {
    return (
        <>
            <div className="lg:hidden">
                <MobileEvents />
            </div>
            <div className="hidden md:block pt-[185px]">
                <DesktopEvents />
            </div>
        </>
    )
}

export default Events
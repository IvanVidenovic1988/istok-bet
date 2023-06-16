import React from 'react'
import MobileSidebar from './MobileSidebar'
import DesktopSidebar from './DesktopSidebar'

const Sidebar = () => {
  return (
    <>
      <div className="absolute lg:hidden">
        <MobileSidebar />
      </div>
      <div className="absolute hidden lg:block">
        <DesktopSidebar />
      </div>
    </>
  )
}

export default Sidebar

import React from 'react'
import MobileSidebar from './MobileSidebar'
import DesktopSidebar from './DesktopSidebar'

const Sidebar = () => {
  return (
    <>
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
    </>
  )
}

export default Sidebar

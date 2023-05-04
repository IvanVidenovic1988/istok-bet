import React from 'react'
import { NavLink } from 'react-router-dom'
import { Sport } from '../../types'

type Props = {
  sport: Sport
  toggleSidebarMenu: (arg0: string) => void
  activeSportId: string[]
}

const SportLink = ({ sport, toggleSidebarMenu, activeSportId }: Props) => {

  return (
    <NavLink
      to={`${sport.id}-${sport.name}`}
      className={({ isActive }) =>
        `${isActive
          ? 'border-l-[8px] border-l-[#ffc107]'
          : 'border-l-[8px] border-l-transparent'
        } group hover:bg-[#2f2f2f] pl-[18px] pr-6 h-[30px] flex items-center justify-between text-[14px] text-[#e6e6e6]`
      }
    >
      <span className="font-bold">{sport.name}</span>
      <div className="flex items-center">
        <span className="pr-[5px] opacity-70 text-[12px]">{sport.numberOfEvents}</span>
        <img
          src="/images/arrow-down-white.png"
          onClick={() => toggleSidebarMenu(`${sport.id}-${sport.name}`)}
          className={`w-[8px] h-[8px] opacity-50  ${activeSportId.includes(`${sport.id}-${sport.name}`)
            ? 'visible rotate-180 duration-150'
            : 'invisible rotate-0 duration-150'
            } group-hover:visible`}
        ></img>
      </div>
    </NavLink>
  )
}

export default SportLink

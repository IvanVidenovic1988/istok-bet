import React from 'react'
import { NavLink } from 'react-router-dom'

const TournamentLink = ({ sport, category, tournament }: any) => {

    return (
        <NavLink
            to={`${sport.id}-${sport.name}/${category.id}-${category.name.replaceAll(" ", "-")}/${tournament.id}-${tournament.name.replaceAll(" ", "-")}`}
            key={tournament.id}
            className={({ isActive }) =>
                `${isActive ? 'border-l-[8px] border-l-[#e9af00]' : 'border-l-[8px] border-l-transparent'} group hover:bg-[#2f2f2f] pl-7 pr-6 h-[30px] flex items-center justify-between text-[14px] text-[#aeaeae]`}
        >
            <span className='max-w-[90px] overflow-hidden whitespace-nowrap'>{tournament.name}</span>
            <span className='pr-[15px]  text-[12px]'>{tournament.numberOfEvents}</span>
        </NavLink>
    )
}

export default TournamentLink;

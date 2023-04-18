import React from 'react'
import { NavLink } from 'react-router-dom'
import { Category, Sport } from '../../redux/types/data';

type Props = {
    sport: Sport;
    category: Category;
    toggleSidebarMenu: (arg0: string) => void;
    activeSportId: string[];
}

const CategoryLink = ({ sport, category, toggleSidebarMenu, activeSportId }: Props) => {

    return (
        <NavLink
            to={`${sport.id}-${sport.name}/${category.id}-${category.name.replaceAll(" ", "-")}`}
            className={({ isActive }) =>
                `${isActive ? 'border-l-[8px] border-l-[#a09300bc]' : 'border-l-[8px] border-l-transparent'} group hover:bg-[#2f2f2f] pl-5 pr-6 h-[30px] flex items-center justify-between text-[14px] text-[#e6e6e6]`}
        >
            <span className='max-w-[85px] overflow-hidden whitespace-nowrap'>{category.name}</span>
            <div className='flex items-center'>
                <span className='pr-[5px] opacity-50 text-[12px]'>{category.numberOfEvents}</span>
                <img
                    src="/images/arrow-down-white.png"
                    onClick={() => toggleSidebarMenu(`${category.id}-${category.name}`)}
                    className={`w-[8px] h-[8px] opacity-50 group-hover:visible ${activeSportId.includes(`${category.id}-${category.name}`) ? "visible rotate-180 duration-150" : "invisible rotate-0 duration-150"}`}
                ></img>
            </div>
        </NavLink>
    )
}

export default CategoryLink;

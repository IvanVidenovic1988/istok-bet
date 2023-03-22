import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchContent } from '../../redux/sidebarData';
import { sidebarToggle } from '../../redux/sidebarState';

const Sidebar = () => {

    const [sportState, setSportState] = useState<string[]>([])

    const { sidebarState } = useAppSelector((state) => state.sidebarState)
    const contents = useAppSelector((state) => state.sidebarData.contents)
    console.log("contents: ", contents)

    const isLoading = useAppSelector((state) => state.sidebarData.isLoading)
    const dispatch = useAppDispatch();

    const toggleSport = (selectedSport: string) => {
        if (sportState.includes(selectedSport)) {
            setSportState((currState) => currState.filter((menu) => menu !== selectedSport))
        } else {
            setSportState((menu) => [...menu, selectedSport])
        }
    }

    const modalToggle = () => {
        dispatch(sidebarToggle())
    }

    useEffect(() => {
        dispatch(fetchContent())
    }, [dispatch])

    return (
        <div className={`lg:w-[190px] bg-[#3f4144] lg:bg-transparent rounded-sm ${sidebarState ? "w-[300px] duration-100 ease-linear" : "w-[46px] duration-100 ease-linear"} `}>
            <div className={`fixed h-[46px] pt-[30px] -rotate-90 lg:hidden`}>
                <img
                    src="/images/arrow-down-white.png"
                    onClick={() => modalToggle()}
                    className={`w-[16px] h-[16px] ${sidebarState ? 'rotate-180 duration-200' : 'rotate-0 duration-200'}`}
                ></img>
            </div>

            <div className='pl-[16px] h-[35px]'>
                <h2 className='text-[14px] text-[#ffc107] font-bold'>SPORT</h2>
            </div>

            <div className=''>
                {contents && Object.values(contents.sports).map((sport) => (
                    <div key={sport.id}>
                        <NavLink
                            to={`${sport.id}-${sport.name}`}
                            className={({ isActive }) =>
                                `${isActive ? 'border-l-[8px] border-l-[#ffc107]' : 'border-l-[8px] border-l-transparent'} group hover:bg-[#2f2f2f] pl-[18px] pr-6 h-[30px] flex items-center justify-between text-[14px] text-[#e6e6e6]`}
                        >
                            <span className='font-bold'>{sport.name}</span>
                            <div className='flex items-center'>
                                <span className='pr-[5px] opacity-70 text-[12px]'>{sport.numberOfEvents}</span>
                                <img
                                    src="/images/arrow-down-white.png"
                                    onClick={() => toggleSport(`${sport.id}-${sport.name}`)}
                                    className={`w-[8px] h-[8px] opacity-50  ${sportState.includes(`${sport.id}-${sport.name}`) ? "visible rotate-180 duration-150" : "invisible rotate-0 duration-150"} group-hover:visible`}
                                ></img>
                            </div>
                        </NavLink>

                        <div className={`bg-[#242628] ${sportState.includes(`${sport.id}-${sport.name}`) ? "h-auto overflow-hidden duration-150" : "h-0 overflow-hidden duration-150"}`}>
                            {Object.values(sport.categories).map((category) => (
                                <div key={category.id}>
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
                                                onClick={() => toggleSport(`${category.id}-${category.name}`)}
                                                className={`w-[8px] h-[8px] opacity-50 group-hover:visible ${sportState.includes(`${category.id}-${category.name}`) ? "visible rotate-180 duration-150" : "invisible rotate-0 duration-150"}`}
                                            ></img>
                                        </div>
                                    </NavLink>

                                    <div className={` ${sportState.includes(`${category.id}-${category.name}`) ? "h-auto bg-[#3f4144] lg:bg-[#1a1c1d] overflow-hidden duration-150" : "h-0 overflow-hidden duration-150"}`}>
                                        {Object.values(category.tournaments).map((tournament) => (
                                            <NavLink
                                                to={`${sport.id}-${sport.name}/${category.id}-${category.name.replaceAll(" ", "-")}/${tournament.id}-${tournament.name.replaceAll(" ", "-")}`}
                                                key={tournament.id}
                                                className={({ isActive }) =>
                                                    `${isActive ? 'border-l-[8px] border-l-[#e9af00]' : 'border-l-[8px] border-l-transparent'} group hover:bg-[#2f2f2f] pl-7 pr-6 h-[30px] flex items-center justify-between text-[14px] text-[#aeaeae]`}
                                            >
                                                <span className='max-w-[90px] overflow-hidden whitespace-nowrap'>{tournament.name}</span>
                                                <span className='pr-[15px]  text-[12px]'>{tournament.numberOfEvents}</span>
                                            </NavLink>
                                        ))}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;


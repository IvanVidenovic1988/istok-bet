import React, { FC, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../../shared/routes'
import { useOnClickOutside } from '../../../../shared/hooks/useOnClickOutside'
import { useAppDispatch, useAppSelector } from '../../../../shared/redux/hooks'
import { setSubnavToActive } from '../../redux/navigation'
import { hideSidebar } from '../../../sidebar/redux/sidebar'
import { SUBNAV_ROUTES } from '../../routes'

const SportskoKladjenjeMobileSubNav: FC = () => {
  const { isSubnavActive } = useAppSelector((state) => state.navigation)
  const dispatch = useAppDispatch()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState('')

  const submenuToggle = () => {
    setIsDropdownOpen((currState) => !currState)
    dispatch(hideSidebar())
  }

  const ref = useRef<HTMLUListElement>(null)
  useOnClickOutside(ref, () => setIsDropdownOpen(false))

  const handleSelectedDate = (label: string) => {
    setSelectedDateRange(label)
    setIsDropdownOpen(false)
    dispatch(setSubnavToActive())
  }

  return (
    <div
      className={`relative flex items-center bg-[#2c2e30] 
      ${isSubnavActive
          ? 'border-b-[2px] border-[#ffbb1a] text-[#ffbb1a] bg-[#3f4144]'
          : 'text-[white] border-b-[2px] border-[#525558]'
        } lg:hidden`}
    >
      {isSubnavActive ? (
        <div
          onClick={submenuToggle}
          className="w-[100px] h-[46px] capitalize flex items-center justify-between px-[16px]"
        >
          {selectedDateRange}
          <img
            src="/images/arrow-down-white.png"
            className={`w-[12px] h-[12px] 
            ${isDropdownOpen ? 'rotate-180 duration-200' : 'rotate-0 duration-200'}`
            }
          ></img>
        </div>
      ) : (
        <div
          onClick={submenuToggle}
          className="w-[100px] h-[46px] flex items-center justify-between px-[16px]"
        >
          Vise
          <img
            src="/images/arrow-down-white.png"
            className={`w-[12px] h-[12px] 
            ${isDropdownOpen ? 'rotate-180 duration-200' : 'rotate-0 duration-200'}`
            }
          ></img>
        </div>
      )}

      {isDropdownOpen && (
        <ul
          ref={ref}
          className={`absolute top-[46px] left-0 text-[#e6e6e6] text-left flex flex-col items-center`}
        >
          {SUBNAV_ROUTES.slice(1).map((route) => (
            <NavLink
              to={`${ROUTES.sportskoKladjenje}/${route.link}`}
              key={route.label}
              onClick={() => handleSelectedDate(route.label)}
              className={({ isActive }) =>
                `${isActive ? 'bg-[#525558]' : ''} 
                bg-[#2c2e30] px-[16px] capitalize flex items-center w-[100px] h-[46px] border-b-[1px] border-[#525558]`
              }
            >
              <p>{route.label}</p>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SportskoKladjenjeMobileSubNav

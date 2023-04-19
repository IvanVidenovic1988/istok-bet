import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../../../shared/redux/hooks'
import { NavigationState, setNavigation } from '../../redux/navigation'
import { setSubnavToInactive } from '../../redux/navigation'
import { NAV_ROUTES, NAV_ROUTES_WITH_BG } from '../../routes'

const mobileNavDropdown = ({ setDropdown }: any) => {
  const dispatch = useAppDispatch()

  const closeDropdown = () => {
    setDropdown(false)
  }

  const setNavigationAction = (name: NavigationState) => () => {
    dispatch(setNavigation(name))
    setDropdown(false)
    dispatch(setSubnavToInactive())
  }

  return (
    <div className="">
      <div className="w-full h-[80px] py-[15px] bg-[#242628]">
        <div className="w-[50px] h-[50px] flex-center hover:cursor-pointer">
          <img
            src="/images/white-x.png"
            onClick={() => closeDropdown()}
            className="w-[16px] h-[16px] opacity-30"
          ></img>
        </div>
      </div>

      <div>
        <ul>
          {NAV_ROUTES.map((route) => (
            <NavLink
              to={route.link}
              onClick={setNavigationAction(route.link as NavigationState)}
              key={route.label}
              className={({ isActive }) =>
                `${isActive ? 'bg-[#ffbb1a]' : ''} mobile-dropdown-li`
              }
            >
              <img src="/images/slot-machine.png" className="mobile-dropdown-icon"></img>
              <span className="mobile-dropdown-link text-[#ebebeb]">{route.label}</span>
            </NavLink>
          ))}

          {NAV_ROUTES_WITH_BG.map((route) => (
            <NavLink
              to={route.link}
              onClick={() => closeDropdown()}
              key={route.label}
              className={({ isActive }) =>
                `${isActive ? '' : ''} mobile-dropdown-li bg-[#ffbb1a]`
              }
            >
              <img src="/images/slot-machine.png" className="mobile-dropdown-icon"></img>
              <span className="mobile-dropdown-link">{route.label}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default mobileNavDropdown

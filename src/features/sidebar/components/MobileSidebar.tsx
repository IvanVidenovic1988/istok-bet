import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../shared/redux/hooks'
import { fetchSidebarSports } from '../redux/sidebar'
import { toggleSidebar } from '../redux/sidebar'
import CategoryLink from './sidebarLinks/CategoryLink'
import SportLink from './sidebarLinks/SportLink'
import TournamentLink from './sidebarLinks/TournamentLink'
import { NavLink } from 'react-router-dom'

const MobileSidebar = () => {
  const [activeSportId, setActiveSportId] = useState<string[]>([])

  const { isSidebarOpen } = useAppSelector((state) => state.sidebarData)
  const sports = useAppSelector((state) => state.sidebarData.sports)

  const isLoading = useAppSelector((state) => state.sidebarData.isLoading)
  const dispatch = useAppDispatch()

  const toggleSidebarMenu = (selectedSport: string) => {
    if (activeSportId.includes(selectedSport)) {
      setActiveSportId((currState) => currState.filter((menu) => menu !== selectedSport))
    } else {
      setActiveSportId((menu) => [...menu, selectedSport])
    }
  }

  const sidebarToggle = () => {
    dispatch(toggleSidebar())
  }

  useEffect(() => {
    dispatch(fetchSidebarSports())
  }, [dispatch])

  return (
    <div
      className={`relative lg:w-[190px] bg-[#3f4144] lg:bg-transparent rounded-sm ${isSidebarOpen
        ? 'w-[300px] duration-100 ease-linear'
        : 'w-[46px] duration-100 ease-linear'
        } cursor-pointer`}
    >
      <div className={`absolute h-[46px] -rotate-90 lg:hidden ${isSidebarOpen ? 'pt-[25px] pr-[10px]' : 'flex-center pt-[27px]'}`}>
        <img
          src="/images/arrow-down-white.png"
          onClick={sidebarToggle}
          className={`w-[16px] h-[16px] ${isSidebarOpen ? 'rotate-180 duration-200' : 'rotate-0 duration-200'
            }`}
        ></img>
      </div>

      {isSidebarOpen && (
        <div className="pt-[46px] pl-[16px] h-[35px]">
          <h2 className="text-[14px] text-[#ffc107] font-bold">SPORT</h2>
        </div>
      )}

      {!isSidebarOpen ? (
        <div className="pt-[46px]">
          {sports.map((sport) => (
            <NavLink
              to={`${sport.id}-${sport.name}`}
              key={sport.id}
              className={({ isActive }) =>
                `${isActive ? 'bg-[#ffc107]' : ''} w-[46px] h-[46px] flex-center`
              }
            >
              <img src="/images/slot-machine.png" className="w-[16px] h-[16px]"></img>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="pt-[46px]">
          {sports.map((sport) => (
            <div key={sport.id}>
              <SportLink
                sport={sport}
                toggleSidebarMenu={toggleSidebarMenu}
                activeSportId={activeSportId}
              />

              <div
                className={`bg-[#242628] ${activeSportId.includes(`${sport.id}-${sport.name}`)
                  ? 'h-auto overflow-hidden duration-150'
                  : 'h-0 overflow-hidden duration-150'
                  }`}
              >
                {sport.categories.map((category) => (
                  <div key={category.id}>
                    <CategoryLink
                      sport={sport}
                      category={category}
                      toggleSidebarMenu={toggleSidebarMenu}
                      activeSportId={activeSportId}
                    />

                    <div
                      className={` ${activeSportId.includes(`${category.id}-${category.name}`)
                        ? 'h-auto bg-[#3f4144] lg:bg-[#1a1c1d] overflow-hidden duration-150'
                        : 'h-0 overflow-hidden duration-150'
                        }`}
                    >
                      {category.tournaments.map((tournament) => (
                        <div key={tournament.id}>
                          <TournamentLink
                            sport={sport}
                            category={category}
                            tournament={tournament}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileSidebar

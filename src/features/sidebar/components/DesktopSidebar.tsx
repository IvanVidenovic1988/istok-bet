import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../shared/redux/hooks'
import { fetchSidebarSports } from '../redux/sidebar'
import CategoryLink from './sidebarLinks/CategoryLink'
import SportLink from './sidebarLinks/SportLink'
import TournamentLink from './sidebarLinks/TournamentLink'

const MobileSidebar = () => {
  const [activeSportId, setActiveSportId] = useState<string[]>([])

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

  useEffect(() => {
    dispatch(fetchSidebarSports())
  }, [dispatch])

  return (
    <div className={'w-[190px] bg-transparent rounded-sm'}>
      <div className="pl-[16px] h-[35px]">
        <h2 className="text-[14px] text-[#ffc107] font-bold">SPORT</h2>
      </div>

      <div className="">
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
    </div>
  )
}

export default MobileSidebar

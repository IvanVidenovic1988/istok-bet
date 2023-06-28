import React from 'react'
import { NavLink } from 'react-router-dom'
import { Category, Sport, Tournament } from '../../types'
import { ROUTES } from '../../../../shared/routes'
import { closeAllMarketsForSingleEvent } from '../../../events/redux/singleEvent'
import { useAppDispatch } from '../../../../shared/redux/hooks'
import { hideSidebar } from '../../redux/sidebar'

type Props = {
  sport: Sport
  category: Category
  tournament: Tournament
}

const TournamentLink = ({ sport, category, tournament }: Props) => {

  const dispatch = useAppDispatch()

  return (
    <NavLink
      onClick={() => dispatch(closeAllMarketsForSingleEvent())}
      to={`${ROUTES.sportskoKladjenje}/${ROUTES.sve}/${sport.id}-${sport.name}/${category.id}-${category.name.replaceAll(
        ' ',
        '-',
      )}/${tournament.id}-${tournament.name.replaceAll(' ', '-')}`}
      key={tournament.id}
      className={({ isActive }) =>
        `${isActive
          ? 'border-l-[8px] border-l-[#e9af00]'
          : 'border-l-[8px] border-l-transparent'
        } group hover:bg-[#2f2f2f] pl-7 pr-6 h-[30px] flex items-center justify-between text-[14px] text-[#aeaeae]`
      }
    >
      <span
        onClick={() => dispatch(hideSidebar())}
        className="w-full pl-2 overflow-hidden whitespace-nowrap"
      >
        {tournament.name}
      </span>
      <span className="pr-[15px]  text-[12px]">{tournament.numberOfEvents}</span>
    </NavLink>
  )
}

export default TournamentLink

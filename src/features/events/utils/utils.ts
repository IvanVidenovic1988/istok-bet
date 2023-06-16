import moment from 'moment'
import { Events, mappedEvents } from '../types'
import { groupBy } from 'lodash'

export const mapEventsData = (events: Events): mappedEvents => {
  const groupedByLeagueName = groupBy(events, (event) => event.tournamentName)
  const groupedByLeagueNameAndDate = Object.values(groupedByLeagueName).reduce(
    (acc, group) => {
      return {
        ...acc,
        [group[0].tournamentName]: groupBy(group, (event) =>
          moment(event.startsAt).format('DD.MM.YYYY'),
        ),
      }
    },
    {},
  )

  return groupedByLeagueNameAndDate
}

export const filterButtons = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Konacan ishod',
    value: 'KONAČAN ISHOD',
  },
  {
    label: 'Poluvrermena',
    value: 'POLUVREME',
  },
  {
    label: 'Hendikep',
    value: 'HENDIKEP',
  },
  {
    label: 'Domacin',
    value: 'DOMAĆIN',
  },
  {
    label: 'Gost',
    value: 'GOST',
  },
]

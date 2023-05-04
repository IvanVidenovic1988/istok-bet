import moment from 'moment'
import { Events, mappedEvents } from '../types'
import { groupBy } from 'lodash'

export const mapEventsData = (events: Events): mappedEvents => {
  const groupedByLeagueName = groupBy(events, (event) => event.tournamentName)
  const dd = Object.values(groupedByLeagueName).reduce((acc, group) => {
    return {
      ...acc,
      [group[0].tournamentName]: groupBy(group, (event) =>
        moment(event.startsAt).format('MMMM-Do-YYYY'),
      ),
    }
  }, {})

  return dd
}

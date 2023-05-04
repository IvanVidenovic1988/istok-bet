export type Outcome = {
  active: number
  description: string
  id: number
  name: string
  odd: number
  outcome: number
  shortcut: string
}

export type Market = {
  active: number
  competitors: object
  favourite: false
  id: number
  marketGroups: number[]
  marketId: number
  name: string
  outcomes: { [id: number]: Outcome }
  specialValues: []
}

export type Competitor = {
  id: number
  name: string
  shortName: string
  teamId: number
  type: number
}

export type Event = {
  active: number
  categoryId: number
  categoryName: string
  categoryPosition: number
  competitors: { [id: number]: Competitor }
  description: string
  displayId: number
  id: number
  markets: { [id: number]: Market }
  name: string
  rootEventId: string
  sportId: number
  startsAt: string
  totalMarkets: number
  tournamentGroupId: number
  tournamentNameId: number
  tournamentName: string
  tournamentPosition?: number
  tournamentPrefix?: string
}

export type Events = Event[]

export type mappedEvents = {
  [leagueName: string]: {
    [date: string]: Events
  }
}

export type EventsDataResponse = {
  events: Events
  _mapping: any
}

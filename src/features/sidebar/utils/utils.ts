import { SidebarData, Sports } from '../types'

export const sortByPosition = <T extends { position: number }>(sportsData: T[]) => {
  return sportsData.sort((a, b) => a.position - b.position)
}

export const mapSidebarData = (sports: Sports): SidebarData => {
  return sortByPosition(Object.values(sports)).map((sport) => {
    return {
      ...sport,
      categories: sortByPosition(Object.values(sport.categories)).map((category) => {
        return {
          ...category,
          tournaments: sortByPosition(Object.values(category.tournaments)),
        }
      }),
    }
  })
}

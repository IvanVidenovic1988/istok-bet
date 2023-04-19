type TournamentGroups = {
    id: number;
    description: string | null;
    name: string;
    position: number;
    shortName: string;
    tournamentId: number;
}

export type Tournament = {
    id: number
    abbreviation: string;
    categoryId: number;
    description: string;
    isGrouped: boolean;
    name: string;
    numberOfEvents: number;
    position: number;
    prefix: string | null;
    shortName: string;
    sourceTournamentId: number;
    tournamentGroups: { [id: number]: TournamentGroups }
}

type Tournaments = { [id: number]: Tournament }

export type Category = {
    id: number;
    isoCode: string;
    name: string;
    numberOfEvents: number;
    position: number;
    shortName: string;
    sportId: number;
    tournaments: Tournaments;
}

type Categories = { [id: number]: Category }

type MarketOutcome = {
    id: number;
    isCustomBet: boolean;
    name: string;
    position: number;
    shortName: string;
}

type Market = {
    collapsed: boolean;
    description: string;
    displayModeType: number;
    externalName: string | null;
    id: number;
    isCustomBet: boolean;
    isSpecial: boolean;
    marketGroups: number[];
    name: string;
    outcomes: MarketOutcome[];
    position: number;
    shortName: string;
    sportId: number;
}


export type Sport = {
    id: number;
    categories: Categories;
    iconCode: string;
    markets: { [id: number]: Market }
    name: string;
    numberOfEvents: number;
    position: number;
    shortName: string;
}

export type Sports = { [id: number]: Sport }

export type SidebarDataResponse = {
    marketGroups: any;
    marketOfferTemplates: any;
    sports: Sports;
}

type SidebarCategory = Omit<Category, 'tournaments'> & { tournaments: Tournament[] };
type SidebarSport = Omit<Sport, 'categories'> & { categories: SidebarCategory[] };
export type SidebarData = SidebarSport[];

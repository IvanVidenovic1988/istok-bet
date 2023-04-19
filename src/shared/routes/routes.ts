import moment from "moment"
import Sve from "../../pages/SportskoKladjenje/Sve"

export const ROUTES = {
    home: '/',
    sportskoKladjenje: 'sportsko-kladjenje',
    kladjenjeUzivo: 'kladjenje-uzivo',
    virtuelneIgre: 'virtuelne-igre',
    slotIgre: 'slot-igre',
    igreUzivo: 'igre-uzivo',
    brojevi: 'brojevi',
    promocije: 'promocije',
    blog: 'blog',
    balkanKlub: 'balkan-klub',
    register: 'register',
    sve: 'sve',
    triDana: '3-dana',
    uskoro: "uskoro",
    pregled: 'pregled',
    pregledDesavanja: 'pregled-desavanja',
}

export const NAV_ROUTES = [
    {
        link: ROUTES.sportskoKladjenje,
        label: 'Sportsko kladjenje'
    },
    {
        link: ROUTES.kladjenjeUzivo,
        label: 'Kladjenje uzivo'
    },
    {
        link: ROUTES.virtuelneIgre,
        label: 'Virtuelne igre'
    },
    {
        link: ROUTES.slotIgre,
        label: 'Slot igre'
    },
    {
        link: ROUTES.igreUzivo,
        label: 'Igre uzivo'
    },
    {
        link: ROUTES.brojevi,
        label: 'Brojevi'
    },

]

export const NAV_ROUTES_WITH_BG = [
    {
        link: ROUTES.promocije,
        label: 'Promo'
    },
    {
        link: ROUTES.blog,
        label: 'Blog'
    },
    {
        link: ROUTES.balkanKlub,
        label: 'Balkan Klub'
    },
]



const formatDate = (date: number) => {
    if (date === 0) {
        return {
            label: 'Danas',
            link: moment().format("DD-MM-YYYY")
        }
    }

    return {
        label: moment().add(date, 'day').locale('sr').format("ddd").replace('.', ''),
        link: moment().add(date, 'day').format("DD-MM-YYYY"),
    }
}


export const SUBNAV_ROUTES = [
    {
        label: 'Sve',
        link: ROUTES.sve,
        Element: Sve
    },
    {
        label: formatDate(0).label,
        link: formatDate(0).link,
        Element: Sve
    },
    {
        label: '3 dana',
        link: ROUTES.triDana,
        Element: Sve
    },

    {
        label: 'Uskoro',
        link: `uskoro`,
        Element: Sve
    },
    ...[1, 2, 3, 4, 5, 6, 7].map((n) => (
        {
            label: formatDate(n).label,
            link: formatDate(n).link,
            Element: Sve,
        }
    ))
]

export const SUBNAV_ROUTES_UZIVO = [
    {
        label: 'Pregled',
        link: ROUTES.pregled
    },
    {
        label: 'Pregled Desavanja',
        link: ROUTES.pregledDesavanja
    }
]
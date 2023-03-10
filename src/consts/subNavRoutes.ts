import moment from "moment";
import { ROUTES } from "../config/consts";
import 'moment/locale/sr'
import Sve from "../pages/SportskoKladjenje/Sve";

export const SUBNAV_SVE = [
    {
        label: 'Sve',
        link: ROUTES.sve
    },
]

const formatDate = (date = 0) => {
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
        label: formatDate().label,
        link: formatDate().link,
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
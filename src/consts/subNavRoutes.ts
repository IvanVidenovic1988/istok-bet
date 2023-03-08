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

const today = moment().format("DD-MM-YYYY");

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
        link: `uskoro-${today}`,
        Element: Sve
    },
    {
        label: formatDate(1).label,
        link: formatDate(1).link,
        Element: Sve
    },
    {
        label: formatDate(2).label,
        link: formatDate(2).link,
        Element: Sve
    },
    {
        label: formatDate(3).label,
        link: formatDate(3).link,
        Element: Sve
    },
    {
        label: formatDate(4).label,
        link: formatDate(4).link,
        Element: Sve
    },
    {
        label: formatDate(5).label,
        link: formatDate(5).link,
        Element: Sve
    },
    {
        label: formatDate(6).label,
        link: formatDate(6).link,
        Element: Sve
    },
    {
        label: formatDate(7).label,
        link: formatDate(7).link,
        Element: Sve
    },
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
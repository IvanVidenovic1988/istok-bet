import { ROUTES } from "../config/consts";

export const SUBNAV_ROUTES = [
    {
        label: 'Sve',
        link: ROUTES.sve
    },
    {
        label: '3 dana',
        link: ROUTES.triDana
    },
    {
        label: 'Danas',
        link: ROUTES.danas,
    },
    {
        label: 'Uskoro',
        link: ROUTES.uskoro
    },
    {
        label: 'Pon',
        link: ROUTES.ponedeljak
    },
    {
        label: 'Uto',
        link: ROUTES.utorak
    },
    {
        label: 'Sre',
        link: ROUTES.sreda
    },
    {
        label: 'Cet',
        link: ROUTES.cetvrtak
    },
    {
        label: 'Pet',
        link: ROUTES.petak
    },
    {
        label: 'Sub',
        link: ROUTES.subota
    },
    {
        label: 'Ned',
        link: ROUTES.nedelja
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
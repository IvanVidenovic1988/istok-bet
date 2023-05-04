import moment from 'moment'

export const formatDate = (date: number) => {
  if (date === 0) {
    return {
      label: 'Danas',
      link: moment().format('DD-MM-YYYY'),
    }
  }

  return {
    label: moment().add(date, 'day').locale('sr').format('ddd').replace('.', ''),
    link: moment().add(date, 'day').format('DD-MM-YYYY'),
  }
}

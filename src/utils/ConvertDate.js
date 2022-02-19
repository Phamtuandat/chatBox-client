import moment from 'moment'

const dateConvert = (date) => {
    let dateConverted
    if (moment(Date.now(date)).date() - moment(date).date() < 2) {
        dateConverted = moment(date).fromNow()
    } else {
        dateConverted = moment(date).calendar()
    }
    return dateConverted
}

export default dateConvert

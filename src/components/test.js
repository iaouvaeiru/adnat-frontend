import moment from './node_modules/moment/src/moment'

let startTime = moment('12:00:00 am', 'HH:mm:ss a');
let endTime = moment('12:00:00 pm', 'HH:mm:ss a')
let duration = moment.duration(endTime.diff(startTime))
console.log(duration)
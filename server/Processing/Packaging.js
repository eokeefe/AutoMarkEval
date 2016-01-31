/* Example of unix time calls
Current time in unix => moment().unix();
Yesterday in unix => moment().subtract(1, 'day').unix();
*/

/* Example of finding number of tags within 24hrs of now
var testCount = Instagram_db.find({
  'created_time': {
    $gte: String(moment().subtract(1, 'day').unix()),
    $lt: String(moment().unix())
  }}).count();
*/

Instagram_db.find({}, {fields: {created_time: 1}}).forEach(function (time) {
  /*
  / Script to Go Here
  /
  / For each time entry increment the counter for the specific day on Tags_db.
  / If data is not avalible create entry and incriment to 1.
  */
})

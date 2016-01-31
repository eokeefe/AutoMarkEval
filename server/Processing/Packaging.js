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

// {}, {fields: {_id: 0}}
/* NOT WORKING */
Instagram_db.find({}, {fields: {created_time: 1}}).forEach(function (time) {
  console.log(time);
})

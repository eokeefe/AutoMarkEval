// var today = moment().unix();
// var yesterday = moment().subtract(1, 'day').unix();

console.log(moment().hour(0).unix());
console.log(moment().subtract(1, 'day').unix());

var testCount = Instagram_db.find({
  'created_time': {
    $gte: String(moment().subtract(1, 'day').unix()),
    $lt: String(moment().unix())
  }}).count();

console.log(testCount);

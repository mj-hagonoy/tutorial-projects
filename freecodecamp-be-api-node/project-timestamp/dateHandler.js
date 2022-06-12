const getDate = (date) => {
  try {
    let d = convertToValidDate(date);
    if(d == 'Invalid Date'){
      throw d;
    }
    let utc = d.toString().split('+')[0]
    let aUtc = utc.split(' ')
    let m = aUtc[1];
    let dd = aUtc[2];
    aUtc[1] = dd;
    aUtc[2] = m;
    utc = aUtc.join(' ')
    utc = utc.replace(' ', ', ')
    let unix = d.getTime();
    return { unix, utc };
  } catch (err) {
    return { error: "Invalid Date" };
  }
}

const convertToValidDate = (date) => {
  if (date === undefined || date === '') {
    return new Date();
  }
  const dateInt = new Date(date)
  if (!isNaN(dateInt)) {
    return new Date(dateInt);
  }
  return new Date(parseInt(date));

}

module.exports = { getDate };

console.log(getDate('a'))
const whoAmI = (headers) => {
  return {
    "ipaddress":headers['x-forwarded-for'],
    "language":headers['accept-language'],
    "software":headers['user-agent']
  }
}

module.exports = {whoAmI}
const userResolver = require("./user");
const eventsResolver = require("./events");
const bookingsResolvers = require("./bookings");

const rootResolver ={
    ...userResolver,
    ...eventsResolver,
    ...bookingsResolvers
};

module.exports = rootResolver;
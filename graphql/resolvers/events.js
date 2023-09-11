const Bookings = require("../../models/bookings");
const Event = require("../../models/event");
const User = require("../../models/user");
const{transformedEvent, transformedBooking} = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformedEvent(event)
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const { title, description, price, date } = args.eventInput;
    const creatorId = req.userId; 
    const event = new Event({
      title,
      description,
      price,
      date: new Date(date),
      creator: creatorId,
    });
    try {
      const result = await event.save();
      const creator = await User.findById(creatorId);
      if (!creator) {
        throw new Error("User not found");
      } else {
        creator.createdEvents.push(event);
        await creator.save();
        return transformedEvent(result);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
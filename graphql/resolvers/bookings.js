const{transformedBooking, transformedEvent} = require("./merge")
const Bookings = require("../../models/bookings");
const Event = require("../../models/event");

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Bookings.find();
      return bookings.map((booking) => {
        return transformedBooking(booking);
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      if (!fetchedEvent) {
        throw new Error("Event not found");
      }
      const booking = new Bookings({
        event: fetchedEvent,
        user: "64cc2938700187fc5406cbfa",
      });
  
      const result = await booking.save();
      return transformedBooking(result);
    } catch (err) {
      console.log("Booking failed", err);
      throw err;
    }
  },
  cancelBooking: async (args) => {
    try {
      const booking = await Bookings.findById(args.bookingId).populate("event");
      if (!booking) {
        console.log("Booking not found for ID: " + args.bookingId);
        return null;
      }
  
      const event = transformedEvent(booking.event);
  
      await Bookings.deleteOne({ _id: args.bookingId });
      console.log("Booking canceled successfully");
      return event;
    } catch (err) {
      console.error("Error in cancelBooking resolver:", err);
      throw err;
    }
  }
  
};

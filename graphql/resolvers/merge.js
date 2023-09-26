const Bookings = require("../../models/bookings");
const Event = require("../../models/event");
const User = require("../../models/user");
const DataLoader = require("dataloader");

const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds);
});

const userLoader = new DataLoader(userIds => {
  return User.find({_id: {$in: userIds}});
});

const user = async (userId) => {
    try {
      const userData = await userLoader.load(userId.toString());
      if (!userData) {
        throw new Error("User not found for ID: " + userId);
      }
      return {
        ...userData._doc,
        id: userData.id,
        createdEvents:  eventLoader.load.bind(this, userData._doc.createdEvents),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const events = async (eventIds) => {
    try {
      const eventData = await Event.find({ _id: { $in: eventIds } });
      return eventData.map((event) => {return transformedEvent(event)});
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const singleEvent = async(eventId) =>{
      try{
          const event  = await eventLoader.load(eventId.toString());
          return event;
      }catch(err){
          throw err;
      }
  }

  const transformedBooking = booking =>{
    return{
        ...booking._doc,
        _id: booking.id,
        user : user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString(),
    }
  }

  const transformedEvent = event =>{
    return{
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator),
        date: new Date(event._doc.date).toISOString(),
    }
  }

exports.transformedEvent = transformedEvent;
exports.transformedBooking = transformedBooking;
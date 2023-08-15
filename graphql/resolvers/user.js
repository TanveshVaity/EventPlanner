const bcrypt = require("bcryptjs");
const Bookings = require("../../models/bookings");
const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
    createUser: async (args) => {
      const storedUser = await User.findOne({
        username: args.userInput.username,
      });
      if (storedUser) {
        throw new Error("User already exists");
      } else {
        const password = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
          username: args.userInput.username,
          password: password,
        });
        try {
          const result = await user.save();
          return {
            ...result._doc,
            password: null,
            _id: result.id,
          };
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    },  
};
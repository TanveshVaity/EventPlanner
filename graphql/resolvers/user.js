const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (args) => {
    const storedUser = await User.findOne({
      email: args.userInput.email,
    });
    if (storedUser) {
      throw new Error("User already exists");
    } else {
      const password = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
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
  login: async ({ email, password }) => {
    const user = await User.findOne({email });
    if (!user) {
      throw new Error("User doesn't exist");
    }
  
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new Error("Password is incorrect");
    }
  
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      "supersecretkey",
      {
        expiresIn: "1hr",
      }
    );
    return { userId: user.id, token, tokenExpiration: 1 };
  },  
};

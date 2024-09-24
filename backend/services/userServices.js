// const { Users } = require("../models/model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// class UserService {
//   async createUser(userData) {
//     try {
//       const user = new Users(userData);
//       await user.save();
//       return user;
//     } catch (error) {
//       throw new Error(`Error creating user: ${error.message}`);
//     }
//   }

//   async getUserById(userId) {
//     try {
//       const user = await Users.findById(userId);
//       if (!user) {
//         throw new Error("User not found");
//       }
//       return user;
//     } catch (error) {
//       throw new Error(`Error getting user: ${error.message}`);
//     }
//   }

//   async isUserExists(email) {
//     try {
//       const user = await Users.findOne({ email });
//       return !!user;
//     } catch (error) {
//       throw new Error(`Error checking user existence: ${error.message}`);
//     }
//   }

//   async hashPassword(password) {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       return await bcrypt.hash(password, salt);
//     } catch (error) {
//       throw new Error(`Error hashing password: ${error.message}`);
//     }
//   }

//   getToken(userId) {
//     try {
//       return jwt.sign({ userId }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN || "1h",
//       });
//     } catch (error) {
//       throw new Error(`Error generating token: ${error.message}`);
//     }
//   }

//   async getUserByUsername(email) {
//     try {
//       const user = await Users.findOne({ email });
//       if (!user) {
//         throw new Error("User not found");
//       }
//       return user;
//     } catch (error) {
//       throw new Error(`Error getting user by email: ${error.message}`);
//     }
//   }
// }

// module.exports = new UserService();

const { Users } = require("../models/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  async createUser(userData) {
    try {
      const user = new Users(userData);
      await user.save();
      console.log(user + " while creating the user");
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async getUserById(userId) {
    try {
      const user = await Users.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  async isUserExists(email) {
    try {
      const user = await Users.findOne({ email });
      return !!user;
    } catch (error) {
      throw new Error(`Error checking user existence: ${error.message}`);
    }
  }

  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }
  }

  getToken(userId) {
    try {
      return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      });
    } catch (error) {
      throw new Error(`Error generating token: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Error getting user by email: ${error.message}`);
    }
  }

  async matchPassword(inputPassword, hashedPassword) {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
      throw new Error(`Error matching password: ${error.message}`);
    }
  }
}

module.exports = new UserService();

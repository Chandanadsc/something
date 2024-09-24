// const userService = require("../services/userServices");

// exports.signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const userExists = await userService.isUserExists(email);
//     if (userExists) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await userService.hashPassword(password);
//     const user = await userService.createUser({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     const token = userService.getToken(user._id);

//     res.status(201).json({
//       message: "User created successfully",
//       token,
//       userId: user._id,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error while signup",
//       error: error.message,
//     });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userService.getUserByUsername(email);
//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     const token = userService.getToken(user._id);
//     res.json({
//       token,
//       userId: user._id,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error in login",
//       error: error.message,
//     });
//   }
// };

// // exports.getProfile = async (req, res) => {
// //   try {
// //     const user = await userService.getUserById(req.user.id);
// //     res.json(user);
// //   } catch (error) {
// //     res.status(500).json({
// //       message: "Error fetching user profile",
// //       error: error.message,
// //     });
// //   }
// // };

// // exports.updateProfile = async (req, res) => {
// //   try {
// //     const { username, email } = req.body;
// //     const user = await userService.getUserById(req.user.id);

// //     if (username) user.username = username;
// //     if (email) user.email = email;

// //     await user.save();

// //     res.json({
// //       message: "Profile updated successfully",
// //       user,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       message: "Error updating user profile",
// //       error: error.message,
// //     });
// //   }
// // };

// // exports.changePassword = async (req, res) => {
// //   try {
// //     const { currentPassword, newPassword } = req.body;
// //     const user = await userService.getUserById(req.user.id);

// //     const isMatch = await user.matchPassword(currentPassword);
// //     if (!isMatch) {
// //       return res.status(400).json({
// //         message: "Current password is incorrect",
// //       });
// //     }

// //     user.password = await userService.hashPassword(newPassword);
// //     await user.save();

// //     res.json({
// //       message: "Password changed successfully",
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       message: "Error changing password",
// //       error: error.message,
// //     });
// //   }
// // };
const userService = require("../services/userServices");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await userService.isUserExists(email);
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await userService.hashPassword(password);
    const user = await userService.createUser({
      username,
      email,
      password: hashedPassword,
    });

    console.log(user);
    const token = userService.getToken(user._id);

    res.status(201).json({
      message: "User created successfully",
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while signup",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    console.log(user);
    // console.log(password + "pass from req.body");
    const hashedpass = await user.password;
    console.log(hashedpass + " user password");
    const isMatch = await userService.matchPassword(password, hashedpass);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = userService.getToken(user._id);
    res.json({
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in login",
      error: error.message,
    });
  }
};

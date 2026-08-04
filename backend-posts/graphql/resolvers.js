const User = require('../models/user');

module.exports = {
    createUser: async function({ userInput }, req) {
        const exisitingUser = await User.findOne({email: userInput.email});

        if (exisitingUser) {
            const error = new Error("User exists already!");
            throw error;
        }

        const hashedPassword = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPassword
        });

        const createdUser = await user.save();
        return {...createdUser._doc, _id: createdUser._id.toString(), }
    }
};
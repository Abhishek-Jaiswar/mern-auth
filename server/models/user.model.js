import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        console.log(error);
    }
})

const User = mongoose.model("User", userSchema)

export default User




// Now you have noticed the password is save as it is in the database
// We cannot save password as it is in the database
// we need to encrypt or hash it then save it
// w'll use bcrypt library to hash our password
// the password will be hashed before saving the document in the database
// mongoose provide "pre" hook to save the documenet


// so finally we hash the password after debuging now will move to login controller
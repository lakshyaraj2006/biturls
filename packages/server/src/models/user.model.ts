import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface User extends Document {
    username: string;
    email: string;
    password: string;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
    updatedAt: Date;
    createdAt: Date;
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    next();
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return (await bcrypt.compare(password, this.password));
}

userSchema.methods.generateAccessToken = function () {
    const payload = {
        id: this._id,
        email: this.email
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15min"
    })
}

userSchema.methods.generateRefreshToken = function () {
    const payload = {
        id: this._id,
        email: this.email
    }

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "30d"
    })
}

const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema);


export { User };

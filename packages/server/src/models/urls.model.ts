import mongoose, { Document, Schema } from "mongoose";

interface Url extends Document {
    url: string;
    shortenID: string;
    user: Schema.Types.ObjectId;
    updatedAt: Date;
    createdAt: Date;
}

const userSchema: Schema<Url> = new Schema({
    url: {
        type: String,
        required: [true, "Url is required"],
    },
    shortenID: {
        type: String,
        required: [true, "Shorten id is required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User reference is required"]
    }
}, { timestamps: true });

const Url = (mongoose.models.Url as mongoose.Model<Url>) || mongoose.model<Url>('Url', userSchema);

export { Url };

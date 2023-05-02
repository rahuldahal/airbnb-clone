import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;

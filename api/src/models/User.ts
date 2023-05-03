import bcryptjs from 'bcryptjs';
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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    return next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.doesEmailExist = async function (value: string) {
  return await this.constructor.findOne({ email: value }).select('+password');
};

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;

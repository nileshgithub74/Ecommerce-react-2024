import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:           { type: String },
  email:          { type: String, unique: true },
  password:       { type: String },
  cartData:       { type: Object },
  googleId:       { type: String, sparse: true }, // Google user ID
  profilePicture: { type: String }, // Google profile picture URL
  date:           { type: Date, default: Date.now },
});

const User = mongoose.model('Users', userSchema);
export default User;

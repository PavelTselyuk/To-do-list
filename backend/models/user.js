let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

let userSchema = new Schema({
   login: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 35,
      lowercase: true
   },
   password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 35
   }
})

userSchema.pre('save', async function (next) {
   try {
      // Generate a salt
      let salt = await bcrypt.genSalt(10);
      // Generate a password hash ( salt + hash )
      let passwordHash = await bcrypt.hash(this.password, salt);
      // Reassign a password to hashed password
      this.password = passwordHash;
      next();
   } catch (error) {
      next(error);
   }
});

userSchema.methods.isValidPassword = async function(newPassword){
   try{
      return await bcrypt.compare(newPassword, this.password);
   } catch(error){
      throw new Error(error);
   }
}


let User = mongoose.model("user", userSchema);

module.exports = User; 
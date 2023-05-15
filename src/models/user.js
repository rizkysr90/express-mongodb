module.exports = (mongoose) => {
  let userSchema = new mongoose.Schema(
    {
      first_name: String,
      last_name: String,
      username: String,
      password: String,
    },
    { timestamps: true }
  );
  userSchema.method("introduce", function () {
    console.log(`Hello my name is ${this.first_name} ${this.last_name}`);
  });

  const User = mongoose.model("Users", userSchema);
  return User;
};

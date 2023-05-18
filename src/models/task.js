module.exports = (mongoose) => {
  let taskSchema = new mongoose.Schema(
    {
      title: String,
      details: String,
      date: Date,
      is_done: { type: Boolean, default: false },
      username: String,
    },
    { timestamps: true }
  );
  const Task = mongoose.model("Tasks", taskSchema);
  return Task;
};

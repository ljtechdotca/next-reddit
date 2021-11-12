import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("No Database Found");

const _connect = () => {
  const options = {
    bufferCommands: false,
  };
  if (typeof MONGODB_URI === "string") {
    return mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }
};

const _disconnect = () => {
  return mongoose.disconnect();
};

export const database = {
  connect: _connect,
  disconnect: _disconnect,
};

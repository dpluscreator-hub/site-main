import mongoose, {type Mongoose } from "mongoose"

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
  } | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  }
}

export default async function connectDB(): Promise<Mongoose> {
  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const uri = process.env.MONGODB_URI
        if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable")
    }

    cached!.promise = mongoose.connect(uri, {
      bufferCommands: false,
    })
  }

  cached!.conn = await cached!.promise
  return cached!.conn
}
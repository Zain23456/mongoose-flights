import mongoose from "mongoose"

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('connected', function() {
  console.log(`CONNECTED TO MONGODB ${db.name} at ${db.host}:${db.port}`)
})
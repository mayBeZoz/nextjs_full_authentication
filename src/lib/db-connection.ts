import { connect } from "mongoose"

const connection = {
    is_connected:false
}

export const connectDB = async function () {
    const URI = process.env.MONGO_URI || ""
    try {
        await connect(URI)
        connection.is_connected = true
        console.log("\n\n========== CONNECTED TO DB SUCCESSFULLY ==========\n\n")
    }catch (err) {
        console.log("\n\n========== ERROR IN DB CONNECTION ==========\n\n")
        console.log(err)
        connection.is_connected = false
    }
}
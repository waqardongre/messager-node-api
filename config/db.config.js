const mongoose = require('mongoose');

const connect = () => {

    const url = process.env.MONGO_CONNECTION_STRING;
    mongoose.connect(url, {
        useUnifiedTopology: true
    })

    mongoose.connection.once("open", async () => {
        console.log("Connected to database");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to database  ", err);
    });
}

const disconnect = () => {

    if (!mongoose.connection) {
        return;
    }

    mongoose.disconnect();

    mongoose.once("close", async () => {
        console.log("Disconnected to database");
    });

};

module.exports = {
    connect,
    disconnect
}
const app = require("./app")
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");

// configure dotenv to config.env file
dotenv.config({ path: 'config/config.env' });

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})


// Handling uncaught Exception
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to unhandled uncaught exception");

    server.close(() => {
        process.exit(1);
    });
});


// Incase if any promise rejection is not handled in that case close the server
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to unhandled promise rejection");

    server.close(() => {
        process.exit(1);
    });
});

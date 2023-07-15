require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.DEV_APP_PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`WSV ecomerce start with ${PORT}`);
});

// process.on("SIGINT", () => {
//   server.close(() => {
//     console.log(`Exit Server Express`);
//   });
// });

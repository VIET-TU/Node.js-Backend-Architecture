require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => {
  console.log(`WSV ecomerce start with ${PORT}`);
});

// process.on("SIGINT", () => {
//   server.close(() => {
//     console.log(`Exit Server Express`);
//   });
// });

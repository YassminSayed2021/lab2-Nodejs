const express = require("express");
const connectDB = require("./config/database");
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes")

const app = express();

// body parser
app.use(express.json()); // app.use => application level middleware , parses the request body to the json format
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/posts",postsRoutes);

app.use("/api/v1/users", usersRoutes);




const PORT = process.env.DB_PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});



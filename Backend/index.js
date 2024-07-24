const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute= require('./Routes/users');
const authRoute = require("./Routes/auth");
const postRoute = require("./Routes/posts");
const cors = require("cors");
const conversationRoute = require("./Routes/conversations");
const messageRoute = require("./Routes/messages");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

port=process.env.PORT || 8800;

dotenv.config();

// Check if the public/images directory exists, if not create it
const imagesDir = path.join(__dirname, "public/images");
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

app.use("/images", express.static(imagesDir));

// Database connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectDB();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesDir);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json("Error uploading file");
    }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(port, () => {
    console.log("Server is running on port 8800");
});

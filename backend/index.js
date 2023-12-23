const express =require("express");
const mongoose =require("mongoose");
const cors =require("cors");
const UserRouter = require("./router/user")
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { verifyToken } = require("./middleware/verifyToken");
const { error } = require("console");


const app = express();
app.use(express.json());
// const corsConfig = {
//   credentials: true,
//   origin: true
// };

app.use(cors());
app.use(express.json());
const port =  8800;
const connect = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb+srv://soloseh824:nlU4J9iNh5hyYUOH@cluster0.bl9ourj.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
      console.log("MongoDB connected Successfully.......");
    })
    .catch((err) => {
      console.log(err);
    });
};
app.use(express.json());
app.get('/',(req,res)=>{
  res.send({msg:'running application successfully..........'})
})



//Images and Vedio uploading


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.json());

// Serve uploaded files statically (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use("/api/user",UserRouter)

app.get("/api/list",async(req,res)=>{
  const imagePath = path.join(__dirname, 'uploads')
  var files = []
  require("fs").readdir(imagePath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }
    console.log('Files in the folder:');
    files.forEach(file => {
      files.push(file);
    });
    res.status(200).send({status:true,files:files})
  });
  
})

app.post('/api/save-image', async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ success: false, message: 'Image data is required' });
  }
  const randomString = Math.random().toString(36).substring(2);
  try {
    const base64Data = image.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const imagePath = path.join(__dirname, 'uploads', `${randomString}captured-image.png`);

    await fs.writeFile(imagePath, imageBuffer);
    res.json({ success: true, message: 'Image saved successfully' });
  } catch (error) {
    console.error('Error saving image', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.post('/api/save-video', upload.single('video'), async (req, res) => {
    const videoData = req.file;
    console.log("jkjkjk",req)
    if (!videoData) {
      return res.status(400).json({ success: false, message: 'Video data is required' });
    }
    const randomString = Math.random().toString(36).substring(2);
    try {
      const videoPath = path.join(__dirname, 'uploads', `${randomString}recorded-video.webm`);
      await fs.writeFile(videoPath, videoData.buffer);
      res.json({ success: true, message: 'Video saved successfully' });
    } catch (error) {
      console.error('Error saving video', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });



app.listen(port, () => {
  console.log("Connected on port",port);
  connect();
});

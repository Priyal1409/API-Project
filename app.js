var mongoose = require('mongoose');
var cors = require('cors');
var express = require('express');
const server = express();

mongoose.connect('mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net/__CONCOX__', {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;

server.use(cors(
    {
        origin:'http://localhost:3000',
        credentials:true,
    }
));

const device_sc = {
  _id:{type:String,select:false},
  id: String,
  imei: String,
  sim: String,
  tel: String,
  createdAt: Date,
  client: String
};
const DeviceData = mongoose.model("devices", device_sc);

const status_sc = {
  input: String,
  tag: String,
  case: String,
  imei: String,
  model: String,
  timezone: String,
  info_serial_no: Number,
  output: String,
  socket: String,
  device: String,
  client: String,
  speed: Number,
  gps: Array,
  battery: Number,
  createdAt: Date
};

const StatusData = mongoose.model("status", status_sc);

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.post('/api1',async(req,res) =>{
    let devicesList = [];
    try{
      const resp = await DeviceData.find({}).select('id')
        const response = await StatusData.find({device:"5275"}).sort({createdAt:'1'}).limit(50)
        console.log(response.length);
        response.forEach((re)=>{
          if(re.gps!==null){
          devicesList.push({"5275":{lat:re?.gps[0],long:re?.gps[1]}});
          }
        })
      res.send(devicesList);
    }catch(err){
        res.send({
            error: `${err.message}`,
        });
    }
});

server.listen(3030, () =>
console.log("Server Online now"),
);

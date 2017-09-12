const feathers = require('feathers');
const socketio = require('feathers-socketio');
const service = require('feathers-mongodb');

const app = feathers();

app.configure(socketio(function(io) {
  io.on('connection', function(socket, next) {
    console.log('connected');

    // socket.on('signup', function (userSignupInfo) {
    //   signupMethod.signup(userSignupInfo).then((res)=>{
    //     socket.emit('signup', res);
    //   });
    // });

    socket.on('disconnect', function(socket) {
      console.log('disconnected');
    });
  });

  io.use(function (socket, next) {
    socket.feathers.referrer = socket.request.referrer;
    next();
  });
}));

console.log('App is now running at port 3030');
app.listen(3030);

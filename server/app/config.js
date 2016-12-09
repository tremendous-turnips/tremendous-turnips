var Sequelize = require('sequelize');
var sequelize = new Sequelize('turnip', 'root', process.env.MYSQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

// var User = sequelize.define('users', {
//   username: {type: Sequelize.STRING, field: 'username'},
//   image_url: {type: Sequelize.STRING,field: 'image_url'}
// });

var Chatroom = sequelize.define('chatrooms', {
  hash: {type: Sequelize.STRING, field: 'hash'},
  roomName: {type: Sequelize.STRING, field: 'room_name'},
  firstUser: {type: Sequelize.STRING, field: 'first_user'},
  secondUser: {type: Sequelize.STRING, field: 'second_user'},
  status: {type: Sequelize.STRING, field: 'status'}
});

var Message = sequelize.define('messages', {
  text: {type: Sequelize.STRING,field: 'text'},
  user: {type: Sequelize.STRING},
  chatroom: {type: Sequelize.STRING}
});

// Message.belongsTo(User);
// Message.belongsTo(Chatroom);
// User.belongsTo(Chatroom);
// Chatroom.belongsTo(User, {as: 'firstUser'});
// Chatroom.belongsToMany(Message);
// User.hasMany(Message, {as: 'messages'});
// User.hasMany(Chatroom, {as: 'chatrooms'});

// User.sync({force: false}).then(function () {
//   // User.create({
//   //   username: 'James',
//   //   image_url: 'https://avatars2.githubusercontent.com/u/18106668?v=3&s=460',
//   // });
// });

// User.sync({force: false}).then(function () {
//   // User.create({
//   //   username: 'Evan',
//   //   image_url: 'https://avatars1.githubusercontent.com/u/20055140?v=3&s=460',
//   // });
// });

Chatroom.sync({force: false}).then(function () {
  Chatroom.create({
    roomName: 'Hillary v Donald',
    status: 'closed',
    firstUser: '_____',
    secondUser: '_____'
  });
  Chatroom.create({
    roomName: 'Emacs v Vim',
    status: 'closed',
    firstUser: '_____',
    secondUser: '_____'
  });
  Chatroom.create({
    roomName: 'McDonalds v Burger King',
    status: 'closed',
    firstUser: '_____',
    secondUser: '_____'
  });
  Chatroom.create({
    roomName: 'Coke v Pepsi',
    status: 'closed',
    firstUser: '_____',
    secondUser: '_____'
  });
  Chatroom.create({
    roomName: 'Blue v Black',
    status: 'closed',
    firstUser: '_____',
    secondUser: '_____'
  });
});

Message.sync({force: false}).then(function () {
  // Message.create({
  //   text: 'They both suck.',
  //   userId: 1,
  //   chatroomId: 1
  // });
});

module.exports.Chatroom = Chatroom;
// module.exports.User = User;
// module.exports.Message = Message;

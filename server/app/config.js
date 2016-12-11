var Sequelize = require('sequelize');
var sequelize = new Sequelize('turnip', 'root', process.env.MYSQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

var Chatroom = sequelize.define('chatrooms', {
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

// var User = sequelize.define('users', {
//   username: {type: Sequelize.STRING, field: 'username'},
//   image_url: {type: Sequelize.STRING,field: 'image_url'}
// });

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

Chatroom.sync({force: true}).then(function () {
  Chatroom.create({
    roomName: 'Hillary v Donald',
    firstUser: '_____',
    secondUser: '_____'
  });
  Chatroom.create({
    roomName: 'Emacs v Vim',
    firstUser: '_____',
    secondUser: '_____'
  });
  Chatroom.create({
    roomName: 'McDonalds v Burger King',
    firstUser: '_____',
    secondUser: '_____'
  });
  Chatroom.create({
    roomName: 'Coke v Pepsi',
    firstUser: '_____',
    secondUser: '_____'
  });
  Chatroom.create({
    roomName: 'Blue v Black',
    firstUser: '_____',
    secondUser: '_____'
  });
});

Message.sync({force: true}).then(function () {
  Message.create({
    text: 'Hi!',
    user: 'James',
    chatroom: 'Hillary v Donald'
  });
  Message.create({
    text: 'Hey!',
    user: 'Matt',
    chatroom: 'Hillary v Donald'
  });
  Message.create({
    text: 'How are you?',
    user: 'James',
    chatroom: 'Hillary v Donald'
  });
  Message.create({
    text: 'Good. How about you?',
    user: 'James',
    chatroom: 'Hillary v Donald'
  });
  Message.create({
    text: 'Do you like Trump?',
    user: 'James',
    chatroom: 'Hillary v Donald'
  });
  Message.create({
    text: 'Not really.',
    user: 'James',
    chatroom: 'Hillary v Donald'
  });
});

module.exports.Chatroom = Chatroom;
module.exports.Message = Message;
// module.exports.User = User;

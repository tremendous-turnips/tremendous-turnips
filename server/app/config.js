var Sequelize = require('sequelize');
var sequelize = new Sequelize('turnip', 'root', process.env.MYSQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

var Chatroom = sequelize.define('chatrooms', {
  roomName: {type: Sequelize.STRING, field: 'room_name'},
  firstUser: {type: Sequelize.STRING, field: 'first_user'},
  secondUser: {type: Sequelize.STRING, field: 'second_user'},
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

Chatroom.sync({force: true}).then(function () {
  Chatroom.create({
    roomName: 'Hillary v Donald',
    firstUser: null,
    secondUser: null
  });
  Chatroom.create({
    roomName: 'Emacs v Vim',
    firstUser: null,
    secondUser: null
  });
  Chatroom.create({
    roomName: 'McDonalds v Burger King',
    firstUser: null,
    secondUser: null
  });
  Chatroom.create({
    roomName: 'Coke v Pepsi',
    firstUser: null,
    secondUser: null
  });
  Chatroom.create({
    roomName: 'Blue v Black',
    firstUser: null,
    secondUser: null
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

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

var User = sequelize.define('users', {
  username: {type: Sequelize.STRING, field: 'username', unique: true},
  password: {type: Sequelize.STRING, field: 'password'},
  imageUrl: {type: Sequelize.STRING,field: 'image_url'}
});

// Starter chatrooms
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

// Dummy messages for testing
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

// Dummy users for testing
User.sync({force: true}).then(function () {
  User.create({
    username: 'James',
    password: 'james',
    imageUrl: 'https://avatars2.githubusercontent.com/u/18106668?v=3&s=460'
  });
  User.create({
    username: 'Evan',
    password: 'evan',
    imageUrl: 'https://avatars1.githubusercontent.com/u/20055140?v=3&s=460'
  });
  User.create({
    username: 'David',
    password: 'david',
    imageUrl: 'https://avatars1.githubusercontent.com/u/10459856?v=3&s=460'
  });
  User.create({
    username: 'Matt',
    password: 'matt',
    imageUrl: 'https://avatars1.githubusercontent.com/u/10934811?v=3&s=460'
  });
});

module.exports.Chatroom = Chatroom;
module.exports.Message = Message;
module.exports.User = User;

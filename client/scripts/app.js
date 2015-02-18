// YOUR CODE HERE:

var app = {};

app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function() {
  this.fetch();
};

app.rooms = {};
app.selectedRoom = 'All';
app.friends = {};

app.send = function(message) {
  console.log('enter app.send method');
  $.ajax({
    // always use this url
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.fetch();
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });


};

app.fetch = function() {
  // console.log('how fetching!');
  $.ajax({
    url: this.server + '?order=-createdAt',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      // console.log(JSON.stringify(data)/*.username.split("")*/);
      app.clearMessages();
      _.each(data.results,function(message){
        var room = _.escape(message.roomname);
        if (app.selectedRoom === 'All' || room === app.selectedRoom){
          var userName = _.escape(message.username);
          var messageDiv;
          if (app.friends.hasOwnProperty(userName)){
            messageDiv = '<div class="chat friend"></div>';
          } else {
            messageDiv = '<div class="chat"></div>';
          }
          var newMessage = $(messageDiv);
          newMessage.append('<div class="username">' + userName + '</div>');
          newMessage.append('<div class="text">' + _.escape(message.text) + '</div>');
          newMessage.append('<div class="time">' + _.escape(new Date(message.createdAt)) + '</div>');
          newMessage.append('<div class="room">' + room + '</div>');
          $('#chats').append(newMessage);
          if(! app.rooms.hasOwnProperty(room)){
            app.rooms[room] = room;
            app.addRoom(room);
          }

        }
      });
      // $('#roomSelect').empty();
      // _.each(app.rooms, function(val){
      // });
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message');
    }
  });
};

app.addRoom = function(roomname) {
  $('#roomSelect').append('<li role="presentation" id="' + roomname + '"><a href="#">'+roomname+'</a></li>');
};

app.addFriend = function(friend) {
  if(! app.friends.hasOwnProperty(friend)){
    app.friends[friend] = friend;
    $('#friends').append('<li id="' + friend + '"><a href="#">'+friend+'</a></li>');
  }
};

app.clearMessages = function() {
  $('#chats').empty();
};

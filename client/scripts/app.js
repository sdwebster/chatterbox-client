// YOUR CODE HERE:

var app = {};

app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function() {
  this.fetch();
};

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
        var newMessage = $('<div class="chat"></div>');
        newMessage.append('<div class="username">' + _.escape(message.username) + '</div>');
        newMessage.append('<div class="text">' + _.escape(message.text) + '</div>');
        newMessage.append('<div class="time">' + _.escape(new Date(message.createdAt)) + '</div>');
        newMessage.append('<div class="room">' + _.escape(message.roomname) + '</div>');

        $('#chats').append(newMessage);
      });
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message');
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

//

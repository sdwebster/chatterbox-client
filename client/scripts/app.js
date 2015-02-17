// YOUR CODE HERE:

var app = {};

$(document).ready(function() {
  $('#clear').click(app.clearMessages);
  $('#submitChat').click(function(event){
    event.preventDefault();
    var message = {};
    message.username = window.location.search.substring(window.location.search.indexOf('=')+1)
"anonymous";
    message.text = $('#inputChat').text();
   // message.createdAt =
    message.roomname = 'lobby';
    console.log(message);
    app.send(message);
  });
});

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
  $.ajax({
    url: this.server + '?order=-createdAt',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log(JSON.stringify(data)/*.username.split("")*/);
      _.each(data.results,function(message){
        var newMessage = $('<div class="chat"></div>');
        newMessage.append('<div class="username">' + _.escape(message.username) + '</div>');
        newMessage.append('<div class="text">' + _.escape(message.text) + '</div>');

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

app.init();

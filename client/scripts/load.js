$(document).ready(function() {
  app.init();

  $('#clear').click(app.clearMessages);


  $('#submitChat').click(function(event){
    event.preventDefault();
    var message = {};
    message.username = decodeURI(window.location.search.substring(window.location.search.indexOf('=')+1)) ||
"anonymous";
    message.text = $('#inputChat').val();
   // message.createdAt =
    message.roomname = 'lobby';
    console.log(message);
    app.send(message);
  });

  setInterval(app.fetch.bind(app),500);


  $('#roomSelect').on('click', 'a', function(event){
    event.preventDefault();
    app.selectedRoom = $(this).text();
    console.log(app.selectedRoom);
  });

  $('#chats').on('click', '.username', function(event){
    event.preventDefault();
    app.addFriend($(this).text());
    console.log('added'+$(this).text());
  });



});

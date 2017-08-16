$(function(){
  const FADE_TIME = 150; //ms
  const TYPING_TIMER_LENGTH = 400;//ms
  const COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // initialize variables 
  const $window = $(window);
  const $usernameInput = $('.usernameInput');
  const $messages = $('.messages')
  const $inputMessage = $('.inputMessage');
  const $loginPage = $('.login.page');
  const $chatPage = $('.chat.page');

  // promp for setting username
  let username;
  let connected = false;
  let typing = false;
  let lastTypingTime;
  const $currentinput = $usernameInput.focus();

  const socket = io();

  function addParticipantsMessage(data)
  {
    let message = '';
    if(data.numUsers === 1)
    {
      message += 'there\'s 1 participant';
    }else 
    {
      message += 'there are "+data.numUsers+" participants';
    }
    log(message);
  }

  // set the client's username
  function setUsername()
  {
    username = cleanInput($usernameInput.val().trim());
    //if the username is valid 
    if(username)
    {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentinput = $inputMessage.focus()

      //tell the server your username 
      socket.emit('add user', username)
    }
  }

  // send a chat message
  function sendMessage()
  {
    let message = $inputMessage.val();
    message = cleanInput(message);
    // if there is non empty message and have connection
    if(message && connected)
    {
      $inputMessage.val('')
      addChatMessage({
        username,
        message
      })
      // tell server to execute 'new message' and send along one parameter 
      socket.emit('new message', message)
    }
  }

  // log a message
  function log(message, options)
  {
    let $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options)
  }

  // add the visual chat message to the message list
  function addChatMessage(data, options)
  {
    // don't fade the message in if there is an 'X was typing'
    let $typingMessages = getTypingMessages(data);
    options = options || {};
    if($typingMessages.lengt)
    {
      
    }
  }

  // clean input function
  function cleanInput(txt)
  {

  }
});
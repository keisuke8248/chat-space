$(function(){
  function buildHTML(message){
    if(message.image) {
      var html = `<div class="Post" data-message-id=${message.id}>
                    <div class="Post__info">
                      <a class="Post__info__poster">
                        ${message.user_name}
                      </a>
                      <a class="Post__info__date">
                        ${message.created_at}
                      </a>
                    </div>
                    <div class="Post__message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img class="lower-message__image" src=${message.image}>
                    </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="Post" data-message-id=${message.id}>
                    <div class="Post__info">
                      <a class="Post__info__poster">
                        ${message.user_name}
                      </a>
                      <a class="Post__info__date">
                        ${message.created_at}
                      </a>
                    </div>
                    <div class="Post__message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".Posts").append(html);
      $('.Posts').animate({scrollTop: $('.Posts')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
    .always(function(){
      $('.Form__new-post__send-btn').prop('disabled', false);
    })
  });
  
  var reloadMessages = function() {
    var last_message_id = $('.Post:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Posts').append(insertHTML);
        $('.Posts').animate({ scrollTop: $('.Posts')[0].scrollHeight});
      }
    })
    
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});
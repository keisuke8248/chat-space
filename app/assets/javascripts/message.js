$(function(){
  function buildHTML(message){
    if(message.image) {
      var html = `<div class="Post">
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
      var html = `<div class="Post">
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
});
$(function() {
  /**
  * Sequelize honestly sucks
  **/
  console.log('loaded main.js');

  getConfessions()
    .then(confessions => renderConfessions(confessions));

  $('#tipsForm').on('keyup', event => {
    event.preventDefault();
    if (event.which != 13) {
      return;
    }
    let val = $('#tipsForm').val();
    console.log('input val:', val);
    $(this).val('');
    return $.ajax({
      url: "/confessions",
      method: "POST",
      data: {
        "message": val,
        "user": $('#user').val()
      }
    })
    .done(function(response) {
      console.log('response', response);
      createConfessionLabel(response);
    })
    .fail(function(error) {
      console.log('error', error);
    });
  });

  function getConfessions() {
    return $.ajax({
      url: "/confessions",
      method: "GET"
    })
    .done(function(response) {
      console.log('response', response);
    })
    .fail(function(error) {
      console.log('error', error);
    });
  }

  function renderConfessions(confessions) {
    confessions.forEach(confession => {
      createConfessionLabel(confession);
    });
    console.log('rendering', confessions);
  }

  function createConfessionLabel(confession) {
    console.log('confession', confession);
    $('<li>')
      .text(confession.message)
      .attr('data-id', confession.id)
      .appendTo($('.confession-list'));
  }

});

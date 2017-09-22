$(function() {
  /**
  * Sequelize honestly sucks
  **/
  console.log('loaded main.js');

  getConfessions()
    .then(confessions => renderConfessions(confessions));

  $('#tipsForm').on('keyup', event => {
    event.preventDefault();
    let val = $(this).val();
    console.log('input val:', val);
    $(this).val('');
    return $.ajax({
      url: "/confessions",
      method: "POST",
      data: {
        "message": val,
        "user": $('#username').val()
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
    let $label = $('<label>').text(confession.message);
    $('<li>')
      .attr('data-id', confession.id)
      .append($label)
      .appendTo($('.confession-list'));
  }

});

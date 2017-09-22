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
    console.log('user val', $('#user').val());
    console.log('input val:', val);
    return $.ajax({
      url: "/confessions",
      method: "POST",
      data: {
        "message": val,
        "name": $('#user').val()
      }
    })
    .done(function(response) {
      console.log('response', response);
      $('#tipsForm').val('');
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
    $(`
      <div class="card w-30 results">
        <div class="card-block confession-list">
          <h3 class="username">${confession.user.name}</h3>
          <p class="confession">${confession.message || confession.result.message}</p>
        </div>
      </div>
    `).appendTo($('body'));
  }

});

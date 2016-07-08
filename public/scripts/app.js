function createTweetElement(tweet) {
  var html = `<section id="tweet">
        <article>

          <header>
            <img src="${tweet.user.avatars.small}">
            <p>${tweet.user.handle}</p>
            <h1>${tweet.user.name}</h1>
          </header>

          <div class="body">
            <p>${tweet.content.text}</p>
          </div>

          <div class="line-separator long"></div>

          <footer>
            <p>${tweet.created_at}</p>
            <span class="footer-icons">
              <i class="fa fa-flag" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
              <i class="fa fa-heart-o" aria-hidden="true"></i>
            </span>
          </footer>

        </article>
      </section>`
  return $(html);
};



function renderTweets(data) {
  $('#tweet-container').empty();
  data.forEach(function(tweet) {
    $('#tweet-container').append(createTweetElement(tweet));
  });
}

function getTweets() {
  $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(data) {
        renderTweets(data.sort(function(a,b) {
          if (a.created_at > b.created_at) {
            return -1;
          }
          if (a.created_at < b.created_at) {
            return 1;
          }
          return 0;

        }));
      }
    });
}


$(document).ready(function() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    if($("textarea").val() === "") {
       alert("Your tweet is empty!!!");
    } else if($("textarea").val().length >= 140) {
      alert("Too many characters!!!");
    } else {

      var $data = $(this).serialize();

      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $data,
        success: function (data) {
          getTweets()
        }
      });
    }
  });

  getTweets();
});

function clicked() {
  $('.new-tweet').toggle().find('textarea,:text').focus();
};




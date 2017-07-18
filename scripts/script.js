var streamers = ["SypherPK", "Comster404", "dreamhackcs"];

$(document).ready(function(){
  streamers.forEach(function(name){
    $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+name+'?callback=?', function(data){
      if (data.stream === null) { //IF CHANNEL IS OFFLINE
        $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/'+name+'?callback=?', function(data){
          if (data.error === "Not Found") {
            $('.box').append("<div class='row'><div class='col-md-1 col-xs-1'><img src='https://www.riyafoundation.org/wp-content/uploads/2013/11/default.png'></div><div class='col-md-1 col-xs-1'><p>"+name+"</p></div><div class='col-md-1 col-xs-1'>0</div><div class='col-md-2 col-xs-3'>Nonexistent <font color='red'>&#9679</font></div>");
          } else {
            $('.box').append("<div class='row'><div class='col-md-1 col-xs-1'><img src='"+data.logo+"'></div><div class='col-md-1 col-xs-1'><p>"+name+"</p></div><div class='col-md-1 col-xs-1'>0</div><div class='col-md-2 col-xs-3'>Offline <font color='red'>&#9679</font></div>");
          }
        }); // END JSON REQUEST
      } else { //IF CHANNEL IS ONLINE
          $('.box').append("<div class='row'><div class='col-md-1 col-xs-1'><img src='"+data.stream.channel.logo+"'></div><div class='col-md-1 col-xs-1'><p>"+name+"</p></div><div class='col-md-1 col-xs-1'>"+data.stream.viewers+"</div><div class='col-md-2 col-xs-3'>Online <font color='green'>&#9679</font></div>");
        };
    });
  });
});
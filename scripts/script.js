var streamers = ["SypherPK", "Comster404", "dreamhackcs"];

$(document).ready(function(){

    // BUTTON EFFECTS
  $("#showOnline").click(function(){
    $("#online, #offline, #nonexistent, #box").fadeOut();
    $("#online, #box").fadeIn();
  });

  $("#showOffline").click(function(){
    $("#online, #offline, #nonexistent, #box").fadeOut();
    $("#offline, #box").fadeIn();
  });

  $("#nonExistent").click(function(){
    $("#nonexistent").fadeOut();
  });

  $("#showAll").click(function(){
    $("#box").fadeOut();
    $("#online, #offline, #nonexistent, #box").fadeIn();
  });
  // END BUTTON EFFECTS

  streamers.forEach(function(name){
    $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+name+'?callback=?', function(data){
      if (data.stream === null) { //IF CHANNEL IS OFFLINE
        $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/'+name+'?callback=?', function(data){
          if (data.error === "Not Found") {
            // IF CHANNEL DOES NOT EXIST
            $('#box').append("<div id='nonexistent' class='row'><div class='row col-md-3 col-xs-1'>"
                                + "<img class='logo' src='https://www.riyafoundation.org/wp-content/uploads/2013/11/default.png'>"
                              + "</div>"
                                +"<div class='row col-md-3 col-xs-1'>"
                                    +"<p>"+name+"</p>"
                                +"</div>"
                              + "<div class='row col-md-3 col-xs-1'>"
                                +"0"
                              +"</div>"
                              + "<div class='row col-md-3 col-xs-3'>"
                                +"Not Found <font color='red'>&#9679</font>"
                              +"</div>");
          } else {
            $('#box').append("<div id='offline' class='row'>"
                                +"<div class='row col-md-3 col-xs-1'>"
                                    +"<img class='logo' src='"+data.logo+"'>"
                                +"</div>"
                                +"<div class='row col-md-3 col-xs-1'>"
                                    +"<p>"+name+"</p>"
                                +"</div>"
                                +"<div class='row col-md-3 col-xs-1'>"
                                    +"0"
                                +"</div>"
                                +"<div class='row col-md-3 col-xs-3'>"
                                    +"Offline <font color='red'>&#9679</font>"
                                +"</div>");
          }
        }); // END JSON REQUEST
      } else { //IF CHANNEL IS ONLINE
          $('#box').append("<div id='online' class='row'>"
                                +"<div class='row col-md-3 col-xs-1'>"
                                    +"<img class='logo' src='"+data.stream.channel.logo+"'>"
                                +"</div>"
                                +"<div class='row col-md-3 col-xs-1'>"
                                    +"<p>"+name+"</p>"
                                +"</div>"
                                +"<div class='row col-md-3 col-xs-1'>"
                                    +data.stream.viewers+""
                                +"</div>"
                                +"<div class='row col-md-3 col-xs-3'>"
                                    +"Online <font color='green'>&#9679</font>"
                                +"</div>");
        };
    });
  });

});
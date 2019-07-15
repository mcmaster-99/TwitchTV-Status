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
            $('#box').append("<div id='nonexistent' class='row'><div class='row col-md-2 col-xs-2'>"
                                + "<img class='logo' src='https://www.riyafoundation.org/wp-content/uploads/2013/11/default.png'>"
                              + "</div>"
                                +"<div class='text row col-md-3 col-xs-4'>"
                                    +"<p>"+name+"</p>"
                                +"</div>"
                              + "<div class='text row col-md-3 col-xs-2'>"
                                +"0"
                              +"</div>"
                              + "<div class='text row col-md-3 col-xs-1'>"
                                +"Not Found"
                              +"</div>"
                              + "<div class='dot row col-md-0 col-xs-0'>"
                                +"<font color='red'>&#9679</font>"
                              +"</div>");
          } else { // IF CHANNEL IS OFFLINE
            $('#box').append("<div id='offline' class='row'>"
                                +"<div class='row col-md-2 col-xs-2'>"
                                    +"<img class='logo' src='"+data.logo+"'>"
                                +"</div>"
                                +"<div class='text row col-md-3 col-xs-4'>"
                                    +"<p>"+name+"</p>"
                                +"</div>"
                                +"<div class='text row col-md-3 col-xs-2'>"
                                    +"0"
                                +"</div>"
                                +"<div class='text row col-md-3 col-xs-1'>"
                                    +"Offline"
                                +"</div>"
                                + "<div class='dot row col-md-0 col-xs-0'>"
                                  +"<font color='red'>&#9679</font>"
                                +"</div>");
          }
        }); // END JSON REQUEST
      } else { //IF CHANNEL IS ONLINE
          $('#box').append("<div id='online' class='row'>"
                                +"<div class='row col-md-2 col-xs-2'>"
                                    +"<img class='logo' src='"+data.stream.channel.logo+"'>"
                                +"</div>"
                                +"<div class='text row col-md-3 col-xs-4'>"
                                    +"<p>"+name+"</p>"
                                +"</div>"
                                +"<div class='text row col-md-3 col-xs-2'>"
                                    +data.stream.viewers+""
                                +"</div>"
                                +"<div class='text row col-md-3 col-xs-1'>"
                                    +"Online"
                                +"</div>"
                                +"<div class='dot row col-md-0 col-xs-0'>"
                                    +"<font color='green'>&#9679</font>"
                                +"</div>");
                                  
        };
    });
  });

});
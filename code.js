var posx,posy;

$(document).ready(function(){
  

$(document).on('mousemove',function(e){
	 posx = e.pageX; 
	 posy = e.pageY;
});

	var finaldate = ((events.length)*1)-1
	var dateinit = new Date(events[0][2]); 
	var dateend = new Date(events[finaldate][2]);
	var milliseconds = dateinit.getTime();
	var milliseconds2 = dateend.getTime();

	var postime, posline, positionintl, posperc;
	
	for (var i in events) {
		postime = new Date(events[i][2]);
		posline = postime.getTime();
		positionintl = (posline*1)-milliseconds;
		posperc = (positionintl*100)/((milliseconds2*1)-milliseconds)
		
		$("#timeline").append('<div class="event" id="e'+i+'" style="left:'+ posperc +'%; z-index:'+(parseInt(i)+100)+';" onmouseover="hoverEvent('+i+')" onmouseout="deHover('+i+')" onclick="showContent('+i+')"></div>');
		if (events[i][3] == "important") {
			$("#e"+i).css("background","#900");
		}
		$("#contents").append('<div class="piece-content chapter" id="p'+i+'">'+
									'<div class="text-part">' +
										'<div class="piece-date chapter">'+ events[i][0] +'</div>' +
										'<div class="piece-head chapter">'+ events[i][1] +'</div>' +
										'<div class="piece-text chapter">'+ events[i][4] +'</div>' +
										'<div class="moreinfo chapter"><a href="'+ events[i][6] +'">'+ events[i][7] +'</a></div>' +
									'</div>'+
									'<div class="image-part">'+ events[i][5] +'</div>'+
								'</div>')
		
	}
	
	$('.piece-content').hide();
	$('#p0').show();
	$('#e0').addClass("selected-event");
	
	
	$('.arrower').on('mousemove',function(e){
		$(this).css("background","rgba(0,0,0,0.5)").css("color","#FFF").css("cursor","pointer");
	});
	$('.arrower').on('mouseout',function(e){
		$(this).css("background","#FFF").css("color","#000");
	});
	
	$('#prev-arrow').click(function() {
	var selec = ($('.selected-event').attr('id'));
	if (selec == "e0") {
	} else {
		var goto = selec.split("e")
		showContent((goto[1]*1)-1)
	}
});

$('#next-arrow').click(function() {
	var selec = ($('.selected-event').attr('id'));
	var totale = ((events.length)*1)-1
	if (selec == "e"+totale) {
	} else {
		var goto = selec.split("e")
		showContent((goto[1]*1)+1)
	}
});
	
})

function hoverEvent(i){
	$('#e'+i).css("background","rgba(0,0,0,0.5)").css("cursor","pointer")
	$('#timeline').append('<div id="tagname" style="top:'+posy+'px; left:'+posx+'px"><div class="time">'+events[i][0]+'</div><div class="headline-event">'+events[i][1]+'</div></div>');
}

function deHover(i){
	if (events[i][3] == "important") {
			$("#e"+i).css("background","#900");
	} else {
	$('#e'+i).css("background","rgba(200,150,150,0.8)");
	}
	$('#tagname').remove();
}

function showContent(i){
	$('.piece-content').hide();
	$('#p'+i).show();	
	$('.selected-event').removeClass("selected-event");
	$('#e'+i).addClass("selected-event");
}

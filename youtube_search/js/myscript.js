$(function() {	
	var searchfield = $('#query');
	var searchbutton = $('#search-btn');
	console.log(searchfield);
	console.log(searchbutton);
	$(searchfield).on('focus',function(){
		$(this).animate({			
			 width: "60%",			 		 
		}, 400);	
	});
	$(searchfield).on('blur',function(){		
		if(searchfield.val() == '') {
			$(this).animate({			
				 width: "35%",					
			}, 400);
		}		
	});
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
	
});
function call() {	
	    $(".various").fancybox({
	            maxWidth    : 800,
	            maxHeight   : 600,
	            fitToView   : false,
	            width       : '70%',
	            height      : '70%',
	            autoSize    : false,
	            closeClick  : false,
	            openEffect  : 'none',
	            closeEffect : 'none'
	        });
		

}

function search() {
	var query = $('#results');
	var button = $('#buttons');
	q = $('#query').val();
	query.html('');
	button.html('');	
	$.get(
			"https://www.googleapis.com/youtube/v3/search",
			{
				part: 'snippet',
				q :  q,	
				type: 'vedio'	,	
				key: 'AIzaSyC5BNHm1cAPXluv1PHShYSXv5iXFm5GLOE'
			},
			function(data) {				
				var prevPageToken = data.prevPageToken;
				var nextPageToken = data.nextPageToken;
				$.each(data.items, function(i, item){
					var output = getOutput(item);
					query.append(output);
				});
				call();
				var buttons = getButtons(prevPageToken, nextPageToken);
				button.append(buttons);
			}
		);

}
function getOutput(item) {
	var videoId = item.id.videoId,
		title = item.snippet.title,
		description = item.snippet.description,
		thumb = item.snippet.thumbnails.high.url,
		channelTitle = item.snippet.channelTitle,
		videoDate = item.snippet.publishedAt;
		var output = '<li>' + 
		'<div class="list-left">'+
		'<img src="'+thumb+'">'+
		'</div>'+
		'<div class="list-right">'+
		'<h3> <a class="various fancybox fancybox.iframe" href ="https://www.youtube.com/embed/' + videoId +'">'+title+'</a></h3>'+
		'<small> By <span class="cTitle">'+channelTitle+'</span> on' + videoDate+ '</small>'+		
		'<p>'+description+'</p>'+
		'</div>'+
		'</li>'+
		'<div class="clearfix"></div>'+
		'';
		return output;
	
}
function getButtons(prevPageToken, nextPageToken) {	
	if(!prevPageToken) {
		var btnoutput = '<div class ="btn-container">'+
		'<button id="next-button" class="pagging-button" onclick="nextPage()" data-token="'
		+nextPageToken+ 
		'" data-query="' +q+
		'"> Next </button>'
		+'</div';
	}
	else {
		var btnoutput = '<div class ="btn-container">'+
		'<button id="prev-button" class="pagging-button" onclick="prevPage()" data-token="'
		+prevPageToken+ 
		'" data-query="' +q+
		'"> Prev </button>'+		
		'<button id="next-button" class="pagging-button" onclick="nextPage()" data-token="'
		+nextPageToken+ 
		'" data-query="' +q+
		'"> Next </button>'
		+'</div';
	}
	return btnoutput;
}
function nextPage() {
	var query  = $('#results');
	var button = $('#buttons');
	var token  = $('#next-button').data('token');
	var q  = $('#next-button').data('query');
	query.html('');
	button.html('');
	$.get(
			"https://www.googleapis.com/youtube/v3/search",
			{
				part: 'snippet',
				q :  q,	
				pageToken:token, 
				type: 'vedio'	,	
				key: 'AIzaSyC5BNHm1cAPXluv1PHShYSXv5iXFm5GLOE'
			},
			function(data) {				
				var prevPageToken = data.prevPageToken;
				var nextPageToken = data.nextPageToken;
				$.each(data.items, function(i, item){
					var output = getOutput(item);
					query.append(output);
				});
				var buttons = getButtons(prevPageToken, nextPageToken);
				button.append(buttons);
			}
		);
}
function prevPage() {
	var query  = $('#results');
	var button = $('#buttons');
	var token  = $('#prev-button').data('token');
	var q  = $('#prev-button').data('query');
	query.html('');
	button.html('');
	$.get(
			"https://www.googleapis.com/youtube/v3/search",
			{
				part: 'snippet',
				q :  q,	
				pageToken:token, 
				type: 'vedio'	,	
				key: 'AIzaSyC5BNHm1cAPXluv1PHShYSXv5iXFm5GLOE'
			},
			function(data) {				
				var prevPageToken = data.prevPageToken;
				var nextPageToken = data.nextPageToken;
				$.each(data.items, function(i, item){
					var output = getOutput(item);
					query.append(output);
				});
				var buttons = getButtons(prevPageToken, nextPageToken);
				button.append(buttons);
			}
		);
}

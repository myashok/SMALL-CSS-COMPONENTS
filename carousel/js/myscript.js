$(document).ready(function(){
	var speed = 1000;
    var autoload = true;
    var autoload_speed = 3000;
    $('.slide').first().addClass('active');
    $('.slide').hide();
    $('.active').show();
    $('#next').on('click',function(){
    	$('.active').removeClass('active').addClass('oldactive');
    	if($('.oldactive').is(':last-child')) {
    		$('.slide').first().addClass('active');
    	}
    	else {
    		$('.oldactive').next().addClass('active');
    	}    	
    	$('.oldactive').fadeOut(speed);
    	$('.active').fadeIn(speed);   
    	$('.oldactive').removeClass('oldactive'); 	
    });
    $('#prev').on('click',function(){
    	$('.active').removeClass('active').addClass('oldactive');
    	if($('.oldactive').is(':first-child')) {
    		$('.slide').last().addClass('active');
    	}
    	else {
    		$('.oldactive').prev().addClass('active');
    	}    	
    	$('.oldactive').fadeOut(speed);
    	$('.active').fadeIn(speed);   
    	$('.oldactive').removeClass('oldactive'); 	
    });
    if($(autoload == true)) {
    	setInterval(function(){
    	$('.active').removeClass('active').addClass('oldactive');
    	if($('.oldactive').is(':last-child')) {
    		$('.slide').first().addClass('active');
    	}
    	else {
    		$('.oldactive').next().addClass('active');
    	}    	
    	$('.oldactive').fadeOut(speed);
    	$('.active').fadeIn(speed);   
    	$('.oldactive').removeClass('oldactive'); 
    	}, autoload_speed)
    }

})
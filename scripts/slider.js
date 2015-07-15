var sliderId;
var commentsId;

function getTextDesc(block, index) {
	$(block).children('div').css({
		top: "10%",
		opacity: 0
	});
	$(".activeSlide div").animate({
		opacity: 0
	}, 1000);
	$(block).children('div').animate({
		opacity: 1,
		top: "70%"
	}, 700, function() {
		removeActive(index);
	});
}

function getIndex(){
	var count = $(".mainSlider li").length;
	var index = $(".activeSlide").index()+2;

	if (index == count+1) {
		return 1;
	}

	return index;
}

function getCommentId() {
	var count = $(".comments ul li").length;
	var index = $(".activeComment").index()+2;

	if (index == count+1 ) {
		return 1;
	}

	return index;
}

function autoplay(){
	sliderId = setInterval(function(){
		setSlide(getIndex());
	}, 5000);
}

function commentsPlay() {
	commentsId = setInterval(function(){
		setComment(getCommentId());
	}, 5000);
}

function setSlide(index) {
	$(".mainSlider li:nth-child("+index+")").css({
		left: $(window).width()+"px",
		opacity: 1
	});
	$(".mainSlider .activeSlide").animate({
		opacity: 0,
		zIndex: 1
	}, 1000, function(){
		setCircle(index);
	});
	$(".mainSlider li:nth-child("+index+")").animate({
		left: 0,
		zIndex: 10
	},1000, function() {
		getTextDesc(this, index);
	});
}

function setCircle(index) {
	$(".activePag").removeClass('activePag');
	$(".paginationSlider li:nth-child("+index+")").addClass('activePag');
}

function setComment(index) {
	$(".activeComment").fadeOut("middle", function(){
		$(this).removeClass('activeComment');
		$(".comments ul li:nth-child("+index+")").fadeIn("middle").addClass('activeComment');
	})
}

function removeActive(index) {
	$(".activeSlide").removeClass('activeSlide');
	$(".mainSlider li:nth-child("+index+")").addClass('activeSlide');
}

function stopEvListen() {
    $(document).off("click", '.paginationSlider ul li');
}

function startEvListen() {
	setTimeout(function() {
	    startClick();
	}, 2000);
}

function startClick() {
	$(document).on('click', '.paginationSlider ul li', function(event) {
		stopEvListen();
		var index = $(this).index()+1;
		if (index != $(".activePag").index()+1) {
			setSlide(index);
			startEvListen();
		} else {
			startClick();
		}
	});
}

$(document).ready(function() {
	autoplay();
	commentsPlay();
	startClick();
	$(".slider").mouseover(function() {
	    clearInterval(sliderId);
	})
	.mouseout(function() {
	    autoplay();
	});
	$(".comments ul li").mouseover(function() {
	    clearInterval(commentsId);
	})
	.mouseout(function() {
	    commentsPlay();
	});
});
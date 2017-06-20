(function ($, root, undefined) {

	$(function () {

		'use strict';



		var $window = $(window);
		var $body = $('body');
		var $windowHeight = $window.height();
		var $header = $('header');
		var $social_bar = $('#social_bar');
		var $featured_section = $('#featured_section');
		var $featured_slides = $('#featured_slides');
		var $fs_height = $featured_section.outerHeight();






		if ( hasLocalStorage() &&  localStorage.getItem('usine_access_token') != null ) {

			var  $access_token = localStorage.getItem('usine_access_token');
			// console.log('token from localstorage', $access_token);
			callEventsApi($access_token);

		} else {

			if (typeof access_token_url != 'undefined ') {
				getAccessToken();

			}

		}



		// MOBILE NAV
		var $show_nav = $('#show_nav');
		var $nav_items = $('header nav');
		$show_nav.on('click', function(e){
			e.preventDefault();
			$nav_items.toggleClass('navigation_visible');
		})



		jumpToSearchEventsForm();







		setInterval( function(){
			$featured_slides.click();
		}, 5000 )



		$window.scroll(function(){

			var windowScroll = $window.scrollTop();


			if (windowScroll > (300  ))  {
				$header.addClass('visible_header');
				$social_bar.addClass('visible_bar');
			} else {
				$header.removeClass('visible_header');
				$social_bar.removeClass('visible_bar');
			}



		});


		$($featured_slides ).on('click', function(){

			var $vis = $('li.visible_slide', $featured_slides);

			var $next = $vis.next('li');
			if ($next.length == 0 ) {
				$next = $('li', $featured_slides).first();
			}

			$vis.removeClass('visible_slide');
			$next.addClass('visible_slide');

		})


		var $slide_count = Math.floor( $window.width() / 260  );
		$('#partners_slider').bxSlider({
			minSlides: $slide_count,
			maxSlides: $slide_count,
			slideWidth: 260,
			slideMargin: 10,
			auto: true,
			controls: true,
			autoControls: false,
			pager: false
		});


		loadEventSlider();


	});

})(jQuery, this);

function loadEventSlider(){

			$('.event_slider').bxSlider({
				auto: true,
				controls: true,
				autoHover: true,
				video: true,
				pager:false,
				mode: 'fade'
			})
}


function getAccessToken(){


	if( hasLocalStorage() ){
		localStorage.removeItem('usine_access_token');
		localStorage.removeItem('usine_events');
	}

	$.ajax({
		url: access_token_url,
		method: 'GET',
		data: {}
	}).done(function( data ) {

		if (data.error) {
			console.log(error.error_description);
		} else {

			var $access_token = data.access_token;
			//console.log('token from api', $access_token);
			if( hasLocalStorage() ){
				localStorage.setItem('usine_access_token',  $access_token );
			}
			callEventsApi($access_token);
		}

	});


}

function shouldGetEventsFromStorage() {

	if ( hasLocalStorage() ) {
		var usine_events = localStorage.getItem('usine_events');
		var usine_events_time = localStorage.getItem('usine_events_time');

		// are events there and not older than 30 minutes;
		if (usine_events != null && ( ( (new Date().getTime() ) - usine_events_time   )  / 1000 / 60 /30) < 1   ) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function callEventsApi($token){

	// if have local storage and events are stored, and they are not more than 30 minutes old
	if (  shouldGetEventsFromStorage()   ) {
		var usine_events = localStorage.getItem('usine_events');
		initUsineEvents( JSON.parse(usine_events) );

	} else {

		var $dateTimeDebut ='2017-05-01';
		var $dateTimeFin ='2023-12-01';
		// var search_terms = window.location.search.split('&');
		// for (var st = 0; st < search_terms.length; st++) {
		// 	var search_term = search_terms[st];
		// 	if ( search_term.indexOf('dateTimeDebut=') !== -1) {
		//
		// 		var term =  search_term.split('=')[1];
		// 		if (term != '') $dateTimeDebut = term;
		// 	}
		// 	if ( search_term.indexOf('dateTimeFin=') !== -1) {
		//
		// 		var term =  search_term.split('=')[1];
		// 		if (term != '') $dateTimeFin = term;
		// 	}
		// }

		$.ajax({
			url: 'https://api.intrazik.com/api/v1/programmation',
			method: 'GET',
			data: {
				access_token: $token,
				dateTimeDebut: $dateTimeDebut,
				dateTimeFin: $dateTimeFin
			}
		}).done(function( data ) {

			if( hasLocalStorage() ){
				localStorage.setItem('usine_events_time',  new Date().getTime() );
				localStorage.setItem('usine_events',  JSON.stringify(data) );
			}

			initUsineEvents(data);




		}).fail(function(error){

			if (error.responseJSON.error == 'invalid_grant') {
				console.log('invlaidgrant');
				getAccessToken();
			}
		});



	}





}

function getEventTypeName(type_id, event_types){

	var type = _.find(  event_types ,  function(et) {
		return  (et.eventTypeId == type_id);
	});

	if (typeof type != 'undefined') {
		return type.eventTypeLib.fre;
	} else {
		return false;
	}

}

function getMediaFiles(event_id, plays) {
// plays means media such as video, audio, images
	var plays = _.filter(  plays ,  function(p) {
		return  (p.eventId == event_id);
	});

	var medias =  {audios: [] , visuels: [], embededs: [] };

	_.each(  plays   , function(play){

			if (typeof play.medias.audio != 'undefined') {
					audios = play.medias.audio;
					_.each(  audios   , function(audio){
						medias.audios.push(audio.content_url);
					});
			};

			if (typeof play.medias.embeded != 'undefined') {
					embededs = play.medias.embeded;
					_.each(  embededs   , function(embeded){
						medias.embededs.push(embeded.content);
					});
			};

			if (typeof play.medias.visuel != 'undefined') {
					visuels = play.medias.visuel;
					_.each(  visuels   , function(visuel){
						medias.visuels.push(visuel.content_url);
					});
			};


	});


	return medias;


}


function processData(data, dates, search){


	var events = data.events;
	var event_types = data.event_types;
	var plays = data.plays;

	if (typeof dates != 'undefined' && dates !== {}  ) {
				var dateTimeDebut = Date.parse(dates.dateTimeDebut);
			//	var dateTimeFin = Date.parse( dates.dateTimeFin);
				if ( !_.isNaN(dateTimeDebut)   ) {  // &&  !_.isNaN(dateTimeFin)
					 events  = _.filter(  events  , function(e){
							// return (   Date.parse(e.dateStart) >= dateTimeDebut &&   Date.parse(e.dateStart) <= dateTimeFin   )
							return (   Date.parse(e.dateStart) == dateTimeDebut  )
					 });
				}
	}

	if (typeof search != 'undefined' && search != false) {
			events = _.filter(  events  , function(e){
				 return (
					 (e.title.fre.toLowerCase().indexOf( search.toLowerCase() ) > -1) ||
					 (e.description2.fre.toLowerCase().indexOf( search.toLowerCase() ) > -1  )

				   )
			});
	}

	var events_array =  _.toArray(events) ;


	for (var i = 0; i < events_array.length ; i++) {
		var event = events_array[i];
		event['the_title'] = event['title']['fre'];
		event['the_subtitle'] = event['subtitle']['fre'];
		event['the_style'] = event['style']['fre'];
		event['the_description2'] = event['description2']['fre'];
		event['the_link1'] = event['link1']['fre'];
		if (event['the_link1'] == '')  event['the_link1'] = false

		event['the_month'] = event['dateStart'].split('-')[1];
		event['the_month_text'] = numberToMonth(event['the_month']);
		event['the_day'] = event['dateStart'].split('-')[2];

		event['the_description_short'] = jQuery( '<p>' + event['the_description2'] + '</p>' ).text().split(' ').slice(0,50).join(' ') + '...';

		event['the_category'] = getEventTypeName( event['eventTypeId'] , event_types);
		event['the_media'] = getMediaFiles( event['eventId'] , plays);

		event['the_usine_link'] = single_event_page  + '#e=' + event['eventId'];

		event['the_banner'] = ''; // maybe put placeholder here
		if (typeof event['medias'].visuel !== 'undefined'){
			event['the_banner'] = event['medias'].visuel[0].content_url;
		}


	}

	data.events = events_array;


	return data;

}


function get_single_event(events, event_id) {

	var single = _.find(  events ,  function(e) {
		return  (e.eventId == event_id);

	});
	return single;


}

function displaySingleEvent(event, container, compiled){

		container.html(  compiled({ event:   event  })  );
		loadEventSlider(); // slider of this events picture and videos.

}


function displayEvents(data, container, compiled){

			var cloned_data  = _.clone(data);

			var $date_fields = $('.date_field');
			var $event_keyword = $('#eventKeyword');

			var $dates = {};
	    $date_fields.each(function(){
				var $field = $(this);
				$name = $field.attr('name');
				if ( $field.val() != '') $dates[$name] =  $field.val();
			});

			$search = false;
			if ($event_keyword.val() != ''){
				$search = $event_keyword.val();
			}


		var processed_data  = processData(cloned_data, $dates, $search);
		 container.html(  compiled({ events:   processed_data.events  })  );

}



function numberToMonth($int){
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return monthNames[$int -1];
}


function  hasLocalStorage() {
	var testKey = 'test', storage = window.sessionStorage;
	try {
		storage.setItem(testKey, '1');
		storage.removeItem(testKey);
		return true;
	} catch (error) {
		return false;
	}
}


function initUsineEvents(data) {


		var $events_template = $('#events_template').html();
		var $events_container = $('#events_container');
		var $more_events_template = $('#more_events_template').html();
		var $more_events_container = $('#more_events_container');
		var $event_single_template = $('#event_single_template').html();
		var $event_single_container = $('#event_single_container');
		var $date_fields = $('.date_field');
		var $event_keyword = $('#eventKeyword');

		var $calendar_template = $('#calendar_template').html();
		var $calendar_container = $('#calendar_container');






	//$more_events = $processed_events.splice(3,   $processed_events.length  ); // all but first 3
		var $processed_data = processData(data);

	if( $events_container.length  > 0) {
		var compiled =  _.template($events_template);

		$events_for_prochainement = $processed_data.events.slice(0,3); //first 3
		$events_container.html(  compiled({ events:   $events_for_prochainement  })  );
	}

	if ($more_events_container.length >0 ) {
		var more_compiled =  _.template($more_events_template);
		displayEvents( data, $more_events_container, more_compiled );


		$date_fields.on('change', function(e){
			displayEvents( data, $more_events_container, more_compiled );
		});
		$event_keyword.on('keyup', function(e){
			displayEvents( data, $more_events_container, more_compiled );
		});

	}

	if ($calendar_container.length >0 ) {
		var cal1 = $calendar_container.clndr({
				template: $calendar_template,
				forceSixRows: true,
				events: data.events,
				dateParameter: 'dateStart',
				clickEvents: {
					click: function (target) {
							var target_date = target.date._i;
							$('#dateTimeDebut').val(target_date).change();
							$calendar_container.removeClass('clndr_visible');
					}

				}
			});

			$('#dateTimeDebut').on('click', function(){
					$calendar_container.toggleClass('clndr_visible');
			});


		}



	// CHANGE SEARCH BASED ON HASH PARAMS
	if (window.location.hash){
		var hashes = window.location.hash.split('&');
		for (var h = 0; h < hashes.length; h++) {
			var hash = hashes[h];

			if ( hash.indexOf('e=') !== -1) {
				var event_id = hash.split('=')[1];

				if ($event_single_container.length >0){

					var $single_event =   get_single_event($processed_data.events,  event_id  );
					var single_compiled =  _.template($event_single_template);

					displaySingleEvent($single_event, $event_single_container, single_compiled );

					document.title = $single_event.the_title;

				}
			}
		}
	}



} // END OF initUsineEvents


function jumpToSearchEventsForm(){
	var $jump_to_search = $('#jump_to_search');
	var $eventSearchForm = $('#eventSearchForm').hide();

	$jump_to_search.on('click', function(e){
		e.preventDefault();
		var $this = $(this);
		var $href = $this.attr('href');
		var $hash = $href.split('#')[1];

		$eventSearchForm.show();
		if (typeof $hash !== 'undefined') {
			if( $eventSearchForm.length  > 0) {
				$("html, body").animate({ scrollTop: $eventSearchForm.offset().top  - 100 }, 1000);
			} else {
				window.location.href = $href;
			}
		} else {
			window.location.href = $href;
		}
	});
	if (window.location.hash){
		var hashes = window.location.hash.split('&');
		for (var h = 0; h < hashes.length; h++) {
			var hash = hashes[h];
			if ( hash.indexOf('eventSearchForm') !== -1) {
					$eventSearchForm.show();
						$("html, body").animate({ scrollTop: $eventSearchForm.offset().top - 100 }, 1000);
			}
		}
	}
}

function resetCalendar(){
	$('#dateTimeDebut').val('').change();
	$('#calendar_container').removeClass('clndr_visible');
}

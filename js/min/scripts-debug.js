(function ($, root, undefined) {

	$(function () {

		'use strict';



		var $window = $(window);
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







		setInterval( function(){
			$featured_slides.click();

		}, 5000 )



		$window.scroll(function(){

			var windowScroll = $window.scrollTop();


			if (windowScroll > ($fs_height  ))  {
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


	});

})(jQuery, this);




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
		var $dateTimeFin ='2019-12-01';
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

function processEvents(events, event_types){
	var events_array =  _.toArray(events) ;


	for (var i = 0; i < events.length ; i++) {
		var event = events[i];
		event['title'] = event['title']['fre'];
		event['subtitle'] = event['subtitle']['fre'];
		event['style'] = event['style']['fre'];
		event['description2'] = event['description2']['fre'];
		event['link1'] = event['link1']['fre'];
		if (event['link1'] == '')  event['link1'] = false

		event['month'] = event['dateStart'].split('-')[1];
		event['day'] = event['dateStart'].split('-')[2];

		event['description_short'] = jQuery( '<p>' + event['description2'] + '</p>' ).text().split(' ').slice(0,20).join(' ') + '...';

		event['category'] = getEventTypeName( event['eventTypeId'] , event_types);

		event['usine_link'] = single_event_page  + '#e=' + event['eventId'];

		event['banner'] = ''; // maybe put placeholder here
		if (typeof event['medias'].visuel !== 'undefined'){
			event['banner'] = event['medias'].visuel[0].content_url;
		}


	}


	return events_array;

}


function get_single_event(events, event_id) {

	var single = _.find(  events ,  function(e) {
		return  (e.eventId == event_id);

	});
	return single;


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

		console.log('data', data);



	var $events = data.events;
	var $event_types = data.event_types;

	var $processed_events = processEvents($events, $event_types);
	$events_for_prochainement = $processed_events.slice(0,3); //first 3
	$more_events = $processed_events.splice(3,   $processed_events.length  ); // all but first 3


	if( $events_container.length  > 0) {
		var compiled =  _.template($events_template);
		$events_container.html(  compiled({ events:   $events_for_prochainement  })  );
	}

	if ($more_events_container.length >0 ) {
		var more_compiled =  _.template($more_events_template);
		$more_events_container.html(  more_compiled({ events:   $more_events  })  );
	}



	// CHANGE SEARCH BASED ON HASH PARAMS
	if (window.location.hash){
		var hashes = window.location.hash.split('&');
		for (var h = 0; h < hashes.length; h++) {
			var hash = hashes[h];
			console.log(hash);
			if ( hash.indexOf('e=') !== -1) {
				var event_id = hash.split('=')[1];

				if ($event_single_container.length >0){
					var single_compiled =  _.template($event_single_template);
					var $single_event =   get_single_event($events,  event_id  );

					$event_single_container.html(  single_compiled({ event:   $single_event  })  );
				}


			}


		}
	}

} // END OF initUsineEvents

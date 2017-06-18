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







  if (  localStorage.getItem('usine_access_token') != null ) {

    var  $access_token = localStorage.getItem('usine_access_token');
    console.log('token from localstorage', $access_token);
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



  localStorage.removeItem('usine_access_token');
  $.ajax({
    url: access_token_url,
    method: 'GET',
    data: {}
  }).done(function( data ) {

    if (data.error) {
      console.log(error.error_description);
    } else {

      var $access_token = data.access_token;
      console.log('token from api', $access_token);

      localStorage.setItem('usine_access_token',  $access_token );
      callEventsApi($access_token);
    }

  });


}

function callEventsApi($token){


  var $events_template = $('#events_template').html();
  var $events_container = $('#events_container');
  var $more_events_template = $('#more_events_template').html();
  var $more_events_container = $('#more_events_container');


  var $dateTimeDebut ='2017-05-01';
  var $dateTimeFin ='2019-12-01';
  var search_terms = window.location.search.split('&');
  for (var st = 0; st < search_terms.length; st++) {
      var search_term = search_terms[st];
      if ( search_term.indexOf('dateTimeDebut=') !== -1) {

          var term =  search_term.split('=')[1];
          if (term != '') $dateTimeDebut = term;
      }
      if ( search_term.indexOf('dateTimeFin=') !== -1) {

          var term =  search_term.split('=')[1];
          if (term != '') $dateTimeFin = term;
      }
  }



  $.ajax({
    url: 'https://api.intrazik.com/api/v1/programmation',
    method: 'GET',
    data: {
      access_token: $token,
      dateTimeDebut: $dateTimeDebut,
      dateTimeFin: $dateTimeFin
    }
  }).done(function( data ) {


    var $events = data.events;
    var $event_types = data.event_types;
    var $processed_events = processEvents($events, $event_types);

    var compiled =  _.template($events_template);
    var more_compiled =  _.template($more_events_template);

		$events_for_prochainement = $processed_events.slice(0,3); //first 3
		$more_events = $processed_events.splice(3,   $processed_events.length  ); // all but first 3

    $events_container.html(  compiled({ events:   $events_for_prochainement  })  );
    $more_events_container.html(  more_compiled({ events:   $more_events  })  );


  }).fail(function(error){

    if (error.responseJSON.error == 'invalid_grant') {
      console.log('invlaidgrant');
      getAccessToken();
    }
  });


}

function getEventTypeName(type_id, event_types){

		var type = _.filter(  event_types ,  function(et) {
			 return  (et.eventTypeId == type_id);

		});

		if (type.length > 0) {
			return type[0].eventTypeLib.fre;
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


    event['banner'] = ''; // maybe put placeholder here
    if (typeof event['medias'].visuel !== 'undefined'){
        event['banner'] = event['medias'].visuel[0].content_url;
    }


  }


  return events_array;

}


<h2>- Prochainement-</h2>

<div class="container">

  <div id="events_container">
    <span class="loading"></span>
  </div>

</div>

  <h2>- Programme - </h2>

<div class="container">

  <div id="more_events_container">
    <span class="loading"></span>
  </div>

</div>




<script type="text/javascript">
	var access_token_url = '<?php echo get_template_directory_uri(); ?>/access_token.php';
	var single_event_page = '<?php echo get_slug_from_template("template-event.php"); ?>';
</script>
<script id="events_template" type="x-underscore">
<?php echo file_get_contents( get_stylesheet_directory() . '/templates/events.underscore'); ?>
</script>
<script id="more_events_template" type="x-underscore">
<?php echo file_get_contents( get_stylesheet_directory() . '/templates/more_events.underscore'); ?>
</script>

<?php /* Template Name: Event Template */ get_header(); ?>





<?php if (have_posts()): while (have_posts()) : the_post(); ?>

	<!-- article -->
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>


		<section>
			<div class="container">

				<div id="event_single_container">
					<span class="loading"></span>
				</div>

			</div>
		</section>

	</article>
	<!-- /article -->
	
<?php endwhile; ?>

<?php else: ?>

	<!-- article -->
	<article class="container">

		<h2><?php _e( 'Sorry, nothing to display.', 'webfactor' ); ?></h2>

	</article>
	<!-- /article -->

<?php endif; ?>




<script type="text/javascript">
var events_api_url = '<?php echo home_url(); ?>/api/v1/?<?php echo ($event_type); ?>=true';
var access_token_url = '<?php echo get_template_directory_uri(); ?>/access_token.php';
</script>
<script id="event_single_template" type="x-underscore">
<?php echo file_get_contents( get_stylesheet_directory() . '/templates/event_single.underscore'); ?>
</script>


<?php get_footer(); ?>

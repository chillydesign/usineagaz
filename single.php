<?php get_header(); ?>


<!-- section -->
<section id="single_section">

	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

		<!-- article -->
		<article class="container" id="post-<?php the_ID(); ?>" >
			<div class="single_text single_post">
				<h1><?php the_title(); ?></h1>
				<p class="meta"> <i class="fa fa-fw fa-clock-o"></i> <?php the_time('j F Y'); ?>  </p>
				<?php the_content(); // Dynamic Content ?>

				<?php edit_post_link(); // Always handy to have Edit Post Links available ?>

			</div>

		</article>
		<!-- /article -->

        <?php if ( has_post_thumbnail()) : // Check if Thumbnail exists ?>
            <?php $post_image = thumbnail_of_post_url(get_the_ID(), 'large'); ?>
        <?php else: ?>
            <?php $post_image = get_template_directory_uri() . '/images/texture.jpg'; ?>
        <?php endif; ?>
            <div id="single_background" style="background-image:url('<?php echo $post_image; ?>');">
                <div class="gradient"></div>
            </div>



	<?php endwhile; ?>

<?php else: ?>

	<!-- article -->
	<article>

		<h1><?php _e( 'Sorry, nothing to display.', 'webfactor' ); ?></h1>

	</article>
	<!-- /article -->

<?php endif; ?>

</section>
<!-- /section -->




<?php get_footer(); ?>

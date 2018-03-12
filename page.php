<?php get_header(); ?>


<section id="single_section">


    <?php if (have_posts()): while (have_posts()) : the_post(); ?>

        <!-- article -->
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <div class="container">
                <div class="single_text single_post ">

                    <h1><?php the_title(); ?></h1>
                </div>
            </div>
            <?php include('section-loop.php'); ?>


            <div class="container">
                <?php the_content(); ?>
                <?php // comments_template( '', true ); // Remove if you don't want comments ?>
                <?php edit_post_link(); ?>
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
    <article class="container">

        <h2><?php _e( 'Sorry, nothing to display.', 'webfactor' ); ?></h2>

    </article>
    <!-- /article -->

<?php endif; ?>


</section>

<?php get_footer(); ?>

<?php /* Template Name: Partners Template */ get_header(); ?>
<?php
$partenaires_club = get_posts( array(
    'post_type' => 'partenaire',
    'posts_per_page'=> -1,
    'category_name' => 'club-partenaires'
));
$partenaires_institutionnels = get_posts( array(
    'post_type' => 'partenaire',
    'posts_per_page'=> -1,
    'category_name' => 'partenaires-institutionnels'
));

?>
<section id="single_section" style="text-align:center">


    <?php if (have_posts()): while (have_posts()) : the_post(); ?>

        <!-- article -->
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <div class="container">
                <div class="single_text single_post single_text_small">
                    <h1><?php the_title(); ?></h1>
                </div>
            </div>


                <h3>Club partenaires</h3>
            <ul id="partners_list">
                <?php foreach ( $partenaires_club as $post ) :
                    setup_postdata( $post );
                    $partenaire_link = get_field('lien') ;
                    $partenaire_img = thumbnail_of_post_url($post->ID, 'large');
                    ?>
                    <li>
                        <?php if ($partenaire_link !=''): ?><a target="_blank" href="<?php echo $partenaire_link; ?>"><?php endif; ?>
                            <div class="partenaire_inner" style="background-image:url(<?php echo $partenaire_img; ?>);"></div>
                        <?php if ($partenaire_link !=''): ?></a><?php endif; ?>
                    </li>
                <?php endforeach; wp_reset_postdata();?>
            </ul>

            <h3>Partenaires institutionnels</h3>
        <ul id="partners_list">
            <?php foreach ( $partenaires_institutionnels as $post ) :
                setup_postdata( $post );
                $partenaire_link = get_field('lien') ;
                $partenaire_img = thumbnail_of_post_url($post->ID, 'large');
                ?>
                <li>
                    <?php if ($partenaire_link !=''): ?><a target="_blank" href="<?php echo $partenaire_link; ?>"><?php endif; ?>
                        <div class="partenaire_inner" style="background-image:url(<?php echo $partenaire_img; ?>);"></div>
                    <?php if ($partenaire_link !=''): ?></a><?php endif; ?>
                </li>
            <?php endforeach; wp_reset_postdata();?>
        </ul>



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

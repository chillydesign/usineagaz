    <?php $news = get_posts( array('post_type' => 'post', 'posts_per_page'=> 3 )); ?>

<div class="container">
    <h2>- News -</h2>

    <div class="row">
      <?php foreach ( $news as $post ) :
        setup_postdata( $post );
        $news_img = thumbnail_of_post_url($post->ID, 'small');
        ?>
      <div class="col-sm-4">
        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
        <div class="news_img" style="background-image:url('<?php echo $news_img; ?>');"></div>
        <h3><?php echo get_the_title(); ?></h3>
        <p><?php echo get_the_excerpt(); ?> </p>
      </a>
      </div>

   <?php endforeach; wp_reset_postdata();?>



    </div>

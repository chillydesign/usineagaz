

<?php if( function_exists('have_rows') ) : ?>

  <?php if ( have_rows('featured_section')  ) :  ?>

      <?php $slide_index = 0; ?>

    <section id="featured_section" class="section  section_featured_slider">
      <ul id="featured_slides">

        <?php while ( have_rows('featured_section') ) : the_row();     ?>

          <?php $f_content =  get_sub_field('slide_content'); ?>
          <?php $f_title =  get_sub_field('title'); ?>
          <?php $f_image =  get_sub_field('image'); ?>
          <?php $visible = ($slide_index == 0) ?  'visible_slide': ''; ?>

          <li class="<?php echo $visible; ?>" style="background-image:url('<?php echo $f_image['url']; ?>');">
            <div class="slide_text">
              <h1><?php echo $f_title; ?></h1>
              <p><?php echo $f_content; ?></p>
            </div>
            <div class="gradient"></div>
          </li>

            <?php $slide_index++; ?>
        <?php endwhile; ?>

      </ul>
    </section>



  <?php endif; ?>
<?php endif; ?>

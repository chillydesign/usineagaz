<?php $column_count =  sizeof(  get_sub_field('columns')  ); ?>
<?php  ?>

<div class="container">
    <div class="photo_column_container">

        <?php while ( have_rows('columns') ) : the_row(); ?>
            <?php $image =  get_sub_field('image'); ?>
            <?php $content =  get_sub_field('content'); ?>
            <?php $lien =  get_sub_field('lien'); ?>


            <div class="photo_column photo_column_<?php echo $column_count; ?>">


                <div class="photo_column_content" >
                    <div  class="photo_column_image" style="background-image:url(<?php echo $image['sizes']['thumbnail']; ?>)"></div>
                    <?php echo $content; ?>
                    <?php if ($lien) : ?>
                    <a href="<?php echo $lien; ?>" class="button " >Lien</a>
                    <?php endif; ?>
                </div>


            </div>
        <?php endwhile; ?>

    </div>
</div>

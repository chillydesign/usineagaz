<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>

		<link href="//www.google-analytics.com" rel="dns-prefetch">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="<?php bloginfo('description'); ?>">
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" >
		<?php wp_head(); ?>


	</head>
	<body <?php body_class(); ?>>



		  <header>
		    <div class="container">
		      <div class="row">
		        <div class="col-sm-3">
		          <a href="<?php echo home_url(); ?>" id="logo"><?php bloginfo('name'); ?></a>
		        </div>
		        <nav class="col-sm-9">
		           <?php chilly_nav('primary-navigation'); ?>
		        </nav>
		      </div>
		    </div>

		  </header>

			<!-- footer -->
			<footer class="footer" role="contentinfo">

				<p class="container">
					&copy; <?php echo date('Y'); ?> Copyright <?php bloginfo('name'); ?>. Website by <a href="//webfactor.ch" title="Webfactor">Webfactor</a>.
				</p>

			</footer>
			<!-- /footer -->


			<div id="social_bar">

			    <ul>
			      <li><span class="tittle">Chercher&nbsp;un&nbsp;évènement</span><a id="jump_to_search" href="<?php echo get_home_url(); ?>#eventSearchForm"><i class="fa fa-fw fa-search"></i></a></li>
			      <li><span class="tittle">Consulter&nbsp;notre&nbsp;page&nbsp;Facebook</span><a target="_blank" href="https://www.facebook.com/usineagaz/"><i class="fa fa-fw fa-facebook"></i></a></li>
			      <li><span class="tittle">Consulter&nbsp;notre&nbsp;page&nbsp;Twitter</span><a target="_blank" href="https://twitter.com/usine_a_gaz?lang=fr"><i class="fa fa-fw fa-twitter"></i></a></li>
			      <li><span class="tittle">Consulter&nbsp;notre&nbsp;page&nbsp;Instagram</span><a target="_blank" href="https://www.instagram.com/usineagaz"><i class="fa fa-fw fa-instagram"></i></a></li>
			      <!-- <li><a target="_blank" href="#"><i class="fa fa-fw fa-share-alt"></i></a></li>
			      <li><a target="_blank" href="#"><i class="fa fa-fw fa-newspaper-o"></i></a></li>
			      <li><a target="_blank" href="#"><i class="fa fa-fw fa-lock"></i></a></li> -->
			    </ul>
			  </div>







		<?php wp_footer(); ?>
		<?php $tdu = get_template_directory_uri(); ?>
		<script type="text/javascript" src="<?php echo $tdu; ?>/js/min/app.bundle.js?v=<?php echo wf_version(); ?>"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" >
		<script>
		// (function(f,i,r,e,s,h,l){i['GoogleAnalyticsObject']=s;f[s]=f[s]||function(){
		// (f[s].q=f[s].q||[]).push(arguments)},f[s].l=1*new Date();h=i.createElement(r),
		// l=i.getElementsByTagName(r)[0];h.async=1;h.src=e;l.parentNode.insertBefore(h,l)
		// })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		// ga('create', 'UA-XXXXXXXX-XX', 'yourdomain.com');
		// ga('send', 'pageview');
		</script>

	</body>
</html>

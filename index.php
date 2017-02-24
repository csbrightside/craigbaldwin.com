<?php include('assets/header.html') ?>

	<title>Craig Baldwin &ndash; Multidisciplinary designer and developer</title>
	<meta name="description" content="I'm a multidisciplinary designer and developer in Winchester working on print and web projects">

	<meta property="og:title" content="Craig Baldwin &ndash; Multidisciplinary designer and developer">
	<meta property="og:description" content="I'm a multidisciplinary designer and developer working on print and web projects">
	<meta property="og:image" content="assets/img/work.jpg">
</head>
<body>

<?php include('assets/navigation.html') ?>

<div class="content">
	<p class="big home">
		I'm Craig Baldwin; a multidisciplinary designer with five years' experience, living in Winchester. I'm able to work seamlessly across print and code to deliver a brief quickly and to cost. 
	</p>

	<p class="home">
		This website features my latest <a href="/work">work</a>, more information <a href="/about">about me</a>, and my latest travels in the <a href="/mountains">mountains</a>.
	</p>

	<ul class="blocks home">
		<li>
			<a href="/work/">
				<img src="assets/img/work.jpg" srcset="assets/img/work.jpg 500w, assets/img/work-2x.jpg 900w" alt="">
				<span>Latest work</span>
			</a>
		</li>
		<li>
			<a href="/mountains/">
				<img src="assets/img/mountains.jpg" srcset="assets/img/mountains.jpg 500w, assets/img/mountains-2x.jpg 900w" alt="">
				<span class="black">Mountains</span>
			</a>
		</li>
	</ul>
</div>

<?php include('assets/footer.html') ?>
<script>$('.nav__insert').replaceWith('<span>/&nbsp; Designer &amp; developer</span>');</script>
</body>
</html>
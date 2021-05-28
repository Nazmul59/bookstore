<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@include('admin.layouts.head')
<body class=" skin-blue sidebar-mini fixed">
	<div id="app">
		@include('admin.layouts.header')
		@include('admin.layouts.left_sidebar_v2')
		<div class="content-wrapper">
			<main id="page-content">
				@yield('content')
			</main>
		</div>
	</div>
	@include('admin.components.modal_popup')
	@include('admin.layouts.footer')
</body>
</html>



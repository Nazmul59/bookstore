<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->

    <link href="{{ asset('css/font-css.css') }}" rel="stylesheet">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('font/css/open-iconic-bootstrap.css') }}" rel="stylesheet">
    <!-- font awesome -->
    <link href="{{ asset('css/all.min.css') }}" rel='stylesheet' />
    <!-- IcoFont Min CSS -->
    <link rel="stylesheet" href="{{ asset('site-assets/css/icofont.min.css') }}" />
    {{-- <link href="{{ asset('css/sidebar.css') }}" rel="stylesheet"> --}}
    {{-- <link href="{{ asset('css/sidebar_v3.css') }}" rel="stylesheet"> --}}
    <link href="{{ asset('css/sidebar_v2.css') }}" rel="stylesheet">
    {{-- <link href="{{ asset('css/sidebar_v4.css') }}" rel="stylesheet"> --}}
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('css/colors.css') }}" rel="stylesheet" media="all">

    @stack('css_lib')
    @stack('css_custom')
</head>

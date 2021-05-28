<!-- Scripts -->
@stack('js_lib')

<script type="application/javascript" src="{{ asset('js/app.js') }}"></script>
<script type="application/javascript" src="{{ asset('js/jquery.blockUI.js') }}"></script>
<script type="application/javascript"
    src="{{ asset('../node_modules/jquery-validation/dist/jquery.validate.min.js') }}"></script>
<script type="application/javascript" src="{{ asset('js/left_menu.js') }}"></script>
<script type="application/javascript" src="{{ asset('js/custom.js') }}"></script>

@stack('scripts')
<script type="application/javascript">
    $(document).ready(function() {

        //$('#tree').treed();

        // on window load
        // var pageurl = 'route(Route::getCurrentRoute()->getName()) '; // To Pass Id i changed it (Anik)
        var pageurl = '{{ url()->full() }}';
        var img_path = 'images/loader.gif';
        console.log(pageurl);

        if (pageurl != "") {
            blockUI();
            $.ajax({
                async: false,
                type: 'get',
                url: pageurl,
                beforeSend: function() {
                    blockUI();
                },
                success: function(data) {
                    $.unblockUI();
                    $('#page-content').html(data);
                }
            });
        }

    });

</script>
@include('admin.layouts.autocomplete_js')

<aside class="main-sidebar" style="height: 100%; display: flex; overflow-y: auto; overflow-x: hidden; z-index: 9;">
    {{-- <div class="menu-icons">
		<div class="menu-icons">
			<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
				<a class="main-menu active" id="v-pills-patient-tab" data-toggle="pill" href="#v-pills-patient" role="tab" aria-controls="v-pills-patient" aria-selected="true">
					<i class="fa fa-lg fa-procedures"></i>
					<div>PAT</div>
				</a>
				<a class="main-menu" id="v-pills-appointment-tab" data-toggle="pill" href="#v-pills-appointment" role="tab" aria-controls="v-pills-appointment" aria-selected="false">
					<i class="fa fa-lg fa-calendar"></i>
					<div>APP</div>
				</a>
				<a class="main-menu" id="v-pills-billing-tab" data-toggle="pill" href="#v-pills-billing" role="tab" aria-controls="v-pills-billing" aria-selected="false">
					<i class="fas fa-file-invoice-dollar"></i>
					<div>BILLING</div>
				</a>
			</div>
		</div>
	</div> --}}


    <div class="sub-menus">
        <ul class="sidebar-menu" data-widget="tree">
            <li class="header">
                <span id="module_name">MAIN</span> NAVIGATION
                <span id="menu_loading"></span>
            </li>
        </ul>

        <div id="menu_list">
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-patient" role="tabpanel"
                    aria-labelledby="v-pills-patient-tab">
                    @php echo $menu_list ?? '' @endphp
                </div>
                <div class="tab-pane fade" id="v-pills-appointment" role="tabpanel"
                    aria-labelledby="v-pills-appointment-tab">
                    @php echo $menu_list ?? '' @endphp
                </div>
                <div class="tab-pane fade" id="v-pills-billing" role="tabpanel" aria-labelledby="v-pills-billing-tab">
                    @php echo $menu_list ?? '' @endphp
                </div>
            </div>
        </div>
    </div>
</aside>

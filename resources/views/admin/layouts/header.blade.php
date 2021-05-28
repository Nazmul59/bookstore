{{-- <nav class="navbar navbar-expand-md sticky-top navbar-dark bg-navy shadow-sm"> --}}
@php
$company_details = $lead_unit = \App\Models\Company::where('status', 1)->first();
$imageURL = isset($company_details->logo) ? '/images/uploads/hospital_images/' . $company_details->logo : 'images/login_page_logo.png';
$backgroundColor = isset($company_details->logo_background_color) ? $company_details->logo_background_color : 'white';
$hospitalCode = isset($company_details->hospital_code) ? $company_details->hospital_code : 'H360';

@endphp

<div class="row">
    <div class="col-md-10">
        <nav class="navbar custom-navbar navbar-expand-lg navbar-light bg-success">
            <div class="brand" style="width: 270px; text-align: center">
                <a class="navbar-brand" href="{{ route('home') }}" style="">
                    {{-- <img class="w-100" src="{{ asset($imageURL) }}"> --}}
                    <h4 class="mb-0 text-white" style="font-weight: bold">{{ $hospitalCode }}</h4>
                </a>
            </div>
            <div class="">
                <a href="#" class="sidebar-toggle text-white" data-toggle="push-menu" role="button">
                    <span class="indicator glyphicon-chevron-left oi oi-menu"></span>
                </a>
            </div>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="far fa-envelope"></i>
                            <span class="label label-success">4</span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div class="messages-notify">
                                <div class="header">You have 4 messages</div>
                                <div class="items">
                                    <ol>
                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <!-- start float -->
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        Support Team
                                                        <small class="float-right"><i class="far fa-clock"></i> 5
                                                            mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        AdminLTE Design Team
                                                        <small class="float-right"><i class="far fa-clock"></i> 2
                                                            hours</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        Developers
                                                        <small class="float-right"><i clrass="faa-clock-o"></i>
                                                            Today</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        Sales Department
                                                        <small class="float-right"><i clrass="faa-clock-o"></i>
                                                            Yesterday</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        Reviewers
                                                        <small class="float-right"><i class="far fa-clock"></i> 2
                                                            days</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                                <div class="footer"><a href="#">See All Messages</a></div>
                            </div>
                        </div>
                    </li>


                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="far fa-bell"></i>
                            <span class="label label-success">4</span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div class="messages-notify">
                                <div class="header">You have 4 messages</div>
                                <div class="items">
                                    <ol class="menu">
                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <!-- start float -->
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        Support Team
                                                        <small class="float-right"><i class="far fa-clock"></i> 5
                                                            mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        AdminLTE Design Team
                                                        <small class="float-right"><i class="far fa-clock"></i> 2
                                                            hours</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        Developers
                                                        <small class="float-right"><i clrass="faa-clock-o"></i>
                                                            Today</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        Sales Department
                                                        <small class="float-right"><i clrass="faa-clock-o"></i>
                                                            Yesterday</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class=" d-flex align-items-center">
                                                <div class=""
                                                    style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
                                                    <img src="{{ asset('images/girl.jpg') }}" class="img-circle"
                                                        alt="User Image" style="width: 100%;" />
                                                </div>
                                                <div class="w-100">
                                                    <h4>
                                                        Reviewers
                                                        <small class="float-right"><i class="far fa-clock"></i> 2
                                                            days</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                                <div class="footer"><a href="#">See All Messages</a></div>
                            </div>
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <div class="user user-menu">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="{{ asset('images/girl.jpg') }}" class="user-image" alt="User Image"
                                    style="width:30px;" />
                                <span class="hidden-xs">{{ Auth::user()->user_fullname }}</span>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <ol>
                                    <li class="user-header">
                                        <img src="{{ asset('images/girl.jpg') }}" class="img-circle" alt="User Image"
                                            style="width: 90px;" />

                                        <p>
                                            {{ Auth::user()->user_fullname }}
                                            <small>Member since
                                                <strong>{{ !empty(Auth::user()->au_entry_at) ? date('d M Y', strtotime(Auth::user()->au_entry_at)) : '' }}</strong></small>
                                        </p>
                                    </li>

                                    <li class="user-footer form-row">
                                        <div class="col-md-6 text-left">
                                            <a class="btn btn-md btn-info" rel="tab"
                                                href="<?php echo e(url('profile/manage/' . Auth::user()->user_no_pk)); ?>">Manage
                                                Your Profile</a>
                                        </div>
                                        <div class="col-md-6 text-right">
                                            <a href="{{ route('logout') }}" class="btn btn-md btn-danger">Sign out</a>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>








        {{-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent"> --}}
        {{-- <ul class="nav navbar-nav">
				<li class="nav-item dropdown messages-notify">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<i class="far fa-envelope"></i>
						<span class="label label-success">4</span>
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<ul>
							<li class="header">You have 4 messages</li>
							<li>
								<!-- inner menu: contains the actual data -->
								<ul class="menu">
									<li>
										<div class=" d-flex align-items-center">
											<!-- start float -->
											<div class="" style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
												<img src="{{ asset('images/girl.jpg') }}" class="img-circle" alt="User Image" style="width: 100%;" />
											</div>
											<div class="w-100">
												<h4>
													Support Team
													<small class="float-right"><i class="far fa-clock"></i> 5 mins</small>
												</h4>
												<p>Why not buy a new awesome theme?</p>
											</div>
										</div>
									</li>
									<!-- end message -->
									<li>
										<div class=" d-flex align-items-center">
											<div class="" style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
												<img src="{{ asset('images/girl.jpg') }}" class="img-circle" alt="User Image" style="width: 100%;" />
											</div>
											<div class="w-100">
												<h4>
													AdminLTE Design Team
													<small class="float-right"><i class="far fa-clock"></i> 2 hours</small>
												</h4>
												<p>Why not buy a new awesome theme?</p>
											</div>
										</div>
									</li>
									<li>
										<div class=" d-flex align-items-center">
											<div class="" style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
												<img src="{{ asset('images/girl.jpg') }}" class="img-circle" alt="User Image" style="width: 100%;" />
											</div>
											<div class="w-100">
												<h4>
													Developers
													<small class="float-right"><i clrass="faa-clock-o"></i> Today</small>
												</h4>
												<p>Why not buy a new awesome theme?</p>
											</div>
										</div>
									</li>
									<li>
										<div class=" d-flex align-items-center">
											<div class="" style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
												<img src="{{ asset('images/girl.jpg') }}" class="img-circle" alt="User Image" style="width: 100%;" />
											</div>
											<div class="w-100">
												<h4>
													Sales Department
													<small class="float-right"><i clrass="faa-clock-o"></i> Yesterday</small>
												</h4>
												<p>Why not buy a new awesome theme?</p>
											</div>
										</div>
									</li>
									<li>
										<div class=" d-flex align-items-center">
											<div class="" style="width: 50px; border-radius:50%; margin-right:5px; overflow:hidden;">
												<img src="{{ asset('images/girl.jpg') }}" class="img-circle" alt="User Image" style="width: 100%;" />
											</div>
											<div class="w-100">
												<h4>
													Reviewers
													<small class="float-right"><i class="far fa-clock"></i> 2 days</small>
												</h4>
												<p>Why not buy a new awesome theme?</p>
											</div>
										</div>
									</li>
								</ul>
							</li>
							<li class="footer"><a href="#">See All Messages</a></li>
						</ul>
					</div>
				</li>
			</ul>

			<ul class="nav navbar-nav">
				<li class="nav-item dropdown user user-menu">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<img src="{{ asset('images/girl.jpg') }}" class="user-image" alt="User Image" style="width:30px;" />
						<span class="hidden-xs">Alexander Pierce</span>
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<ul>
							<li class="user-header">
								<img src="{{ asset('images/girl.jpg') }}" class="img-circle" alt="User Image" style="width: 90px;" />

								<p>
									Alexander Pierce - Web Developer
									<small>Member since Nov. 2012</small>
								</p>
							</li>

							<li class="user-footer form-row">
								<div class="col-md-6 text-left">
									<a href="#" class="btn btn-md btn-info">Profile</a>
								</div>
								<div class="col-md-6 text-right">
									<a href="#" class="btn btn-md btn-danger">Sign out</a>
								</div>
							</li>
						</ul>
					</div>
				</li>
			</ul> --}}


















        {{-- <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
				<!-- Authentication Links -->
				@guest
				<li class="nav-item">
					<a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
				</li>
				@if (Route::has('register'))
				<li class="nav-item">
					<a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
				</li>
				@endif
				@else
				<li class="nav-item dropdown">
					<a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
						Logged in as - {{ Auth::user()->user_fullname }} <span class="caret"></span>
					</a>

					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" href="{{ route('logout') }}"
						onclick="event.preventDefault();
						document.getElementById('logout-form').submit();">
						{{ __('Logout') }}
					</a>

					<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
						@csrf
					</form>
				</div>
			</li>
			@endguest
		</ul> --}}
    </div>
</div>
{{-- </nav> --}}

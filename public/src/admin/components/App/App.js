export default {
    name: 'App',
    props: ['menu'],
    methods: {

    },
    template: `
        <div class="app">

            <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
                <div class="container-fluid">

                    <!-- Toggler -->
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <!-- Brand -->
                    <router-link to="/" class="navbar-brand">
                        <img src="/images/admin/logo.svg" class="navbar-brand-img mx-auto" alt="">
                    </router-link>

                    <!-- User (xs) -->
                    <div class="navbar-user d-md-none">
                        <!-- Dropdown -->
                        <div class="dropdown">
                            <!-- Toggle -->
                            <a href="#" id="sidebarIcon" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="avatar avatar-sm avatar-online">
                                    <img src="/images/admin/avatars/profiles/avatar-1.jpg" class="avatar-img rounded-circle" alt="...">
                                </div>
                            </a>
                            <!-- Menu -->
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="sidebarIcon">
                                <a href="profile-posts.html" class="dropdown-item">Profile</a>
                                <a href="settings.html" class="dropdown-item">Settings</a>
                                <hr class="dropdown-divider">
                                <a href="sign-in.html" class="dropdown-item">Logout</a>
                            </div>
                        </div>
                    </div>

                    <!-- Collapse -->
                    <div class="collapse navbar-collapse" id="sidebarCollapse">
                        <!-- Navigation -->
                        <ul class="navbar-nav">
                            <li class="nav-item" v-for="(menu, index) in menu">
                                <router-link class="nav-link" v-bind:to="menu.uri">
                                    <i class="fe fe-clipboard"></i>
                                    {{ menu.title }}
                                </router-link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

            <router-view></router-view>

        </div>
    `,
}
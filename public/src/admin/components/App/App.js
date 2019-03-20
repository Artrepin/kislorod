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
                        <img src="/images/logo.svg" class="navbar-brand-img mx-auto" alt="">
                    </router-link>

                    <!-- Collapse -->
                    <div class="collapse navbar-collapse" id="sidebarCollapse">
                        <!-- Navigation -->
                        <ul class="navbar-nav">
                            <li class="nav-item" v-for="(menu, index) in menu">
                                <router-link class="nav-link" v-bind:to="menu.uri">
                                    <!-- <i class="fe fe-clipboard"></i> -->
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
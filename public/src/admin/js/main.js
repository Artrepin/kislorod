const Dashboard = {
    template: `<div>Dashboard</div>`
}
const Building = {
    template: `<router-view></router-view>`
}
const BuildingList = {
    template: `<div>BuildingList</div>`
}
const BuildingView = {
    template: `<div>BuildingView</div>`
}
const routes = [
    {
        path: '/',
        component: Dashboard
    },
    {
        path: '/building/',
        component: Building,
        children: [
            {
                path: '',
                component: BuildingList
            },
            {
                path: ':id',
                component: BuildingView,
                props: true
            }
        ]
    }
]
const router = new VueRouter({
    routes
})





const app = new Vue({
    router,
    data: {
        title: 'ADMIN',
        menu: [
            {
                title: 'Dashboard',
                uri: '/'
            },
            {
                title: 'Building',
                uri: '/building'
            },
        ]
    },
    template: `
        <div>
            <ul>
                <li v-for="(menu, index) in menu">
                    <router-link v-bind:to="menu.uri">{{ menu.title }}</router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    `
}).$mount('#app')
import Orders from './Orders.vue'
import PageContent from './PageContent.vue'
import Modify from './Modify.vue'
import Dashboard from './Dashboard.vue'

export default [
  { path: '/', component: PageContent },
  { path: '/orders', name: 'orders', component: Orders },
  { path: '/modify/:id', name: 'modify', component: Modify, props: true},
  { path: '/dashboard', name: 'dashboard', component: Dashboard}
]
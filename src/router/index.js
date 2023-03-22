import { createRouter, createWebHistory } from 'vue-router'

const routesCommon = [
  { path: '/',                      name: 'Home',                   beforeEnter: (to,from,next) => { next({ name: 'TradeOptionPage'}) } },
  { path: '/about',                 name: 'AboutPage',              component: () => import(/* webpackChunkName: "AboutPage" */               '@/pages/AboutPage') },
  { path: '/option-trade',          name: 'TradeOptionPage',        component: () => import(/* webpackChunkName: "TradeOptionPage" */         '@/pages/TradeOptionPage') },
]

const routesOPM = [
  { path: '/opm',                   name: 'OPMTradeListPage',       component: () => import(/* webpackChunkName: "OPM_TradeListPage" */       '@/pages/OPM/TradeListPage'), props: { message: false } },
  { path: '/opm/checklist',         name: 'OPMCheckListPage',       component: () => import(/* webpackChunkName: "OPM_CheckListPage" */       '@/pages/OPM/CheckListPage') },
  { path: '/opm/trade/:id?',        name: 'OPMTradePage',           component: () => import(/* webpackChunkName: "OPM_TradePage" */           '@/pages/OPM/TradePage') },
  { path: '/opm/trade-list-setup',  name: 'OPMTradeListSetupPage',  component: () => import(/* webpackChunkName: "OPM_TradeListSetupPage" */  '@/pages/OPM/TradeListSetupPage') },
  { path: '/opm/trade-list-data',   name: 'OPMTradeListDataPage',   component: () => import(/* webpackChunkName: "OPM_TradeListDataPage" */   '@/pages/OPM/TradeListDataPage') },
]

const routesOPF = [
  { path: '/opf',                   name: 'OPFTradeListPage',       component: () => import(/* webpackChunkName: "OPF_TradeListPage" */       '@/pages/OPF/TradeListPage'), props: { message: false } },
  { path: '/opf/trade/:id?',        name: 'OPFTradePage',           component: () => import(/* webpackChunkName: "OPF_TradePage" */           '@/pages/OPF/TradePage') },
  { path: '/opf/trade-list-setup',  name: 'OPFTradeListSetupPage',  component: () => import(/* webpackChunkName: "OPF_TradeListSetupPage" */  '@/pages/OPF/TradeListSetupPage') },
  { path: '/opf/trade-list-data',   name: 'OPFTradeListDataPage',   component: () => import(/* webpackChunkName: "OPF_TradeListDataPage" */   '@/pages/OPF/TradeListDataPage') },
]
 
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...routesCommon,
    ...routesOPM,
    ...routesOPF
  ]
})

export default router
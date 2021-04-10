import Vue from 'vue'
import VueRouter from 'vue-router'

import Analysis from '../views/Analysis.vue'
import Basics from '../components/Basics.vue'
import Home from '../views/Home.vue'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/analysis",
    name: "Analysis",
    components: {
      default: Analysis
    },
    children: [
      {
        path: "/analysis/basics",

        components: {
          analysis: Basics
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
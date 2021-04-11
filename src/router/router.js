import Vue from 'vue'
import VueRouter from 'vue-router'

import Analysis from '../views/Analysis.vue'
import Aggression from '../components/Aggression.vue'
import AverageGame from '../components/AverageGame.vue'
import Basics from '../components/Basics.vue'
import DuoType from '../components/DuoType.vue'
import Home from '../views/Home.vue'
import MatchType from '../components/MatchType.vue'


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
        name: "Basics",
        components: {
          analysis: Basics
        }
      },
      {
        path: "/analysis/aggression",
        name: "Aggression",
        components: {
          analysis: Aggression
        }
      },
      {
        path: "/analysis/average-game",
        name: "AverageGame",
        components: {
          analysis: AverageGame
        }
      },
      {
        path: "/analysis/match-type",
        name: "MatchType",
        components: {
          analysis: MatchType
        }
      },
      {
        path: "/analysis/duo-type",
        name: "DuoType",
        components: {
          analysis: DuoType
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
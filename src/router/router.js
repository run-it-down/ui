import Vue from 'vue'
import VueRouter from 'vue-router'

import Analysis from '../views/Analysis.vue'
import Aggression from '../components/Aggression.vue'
import AverageGame from '../components/AverageGame.vue'
import Basics from '../components/Basics.vue'
import Combinations from '../components/Combinations.vue'
import DuoType from '../components/DuoType.vue'
import FarmerType from '../components/FarmerType.vue'
import Home from '../views/Home.vue'
import MatchType from '../components/MatchType.vue'
import Millionaire from '../components/Millionaire.vue'
import MurderousDuo from '../components/MurderousDuo.vue'
import Tactician from '../components/Tactician.vue'


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
      {
        path: "/analysis/farmer-type",
        name: "FarmerType",
        components: {
          analysis: FarmerType
        }
      },
      {
        path: "/analysis/murderous-duo",
        name: "MurderousDuo",
        components: {
          analysis: MurderousDuo
        }
      },
      {
        path: "/analysis/tactician",
        name: "Tactician",
        components: {
          analysis: Tactician
        }
      },
      {
        path: "/analysis/millionaire",
        name: "Millionaire",
        components: {
          analysis: Millionaire
        }
      },
      {
        path: "/analysis/combinations",
        name: "Combinations",
        components: {
          analysis: Combinations
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
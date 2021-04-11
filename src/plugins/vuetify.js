import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import NashorIcon from '@/components/icons/NashorIcon.vue'
import DragonIcon from '@/components/icons/DragonIcon.vue'
import HeraldIcon from '@/components/icons/HeraldIcon.vue'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#1c6e8c',
        secondary: '#1c8c72',
        accent: '#1c368c',
        error: '#b71c1c',
      },
      dark: {
        primary: '#48ACF0',
        secondary: '#48f0df',
        accent: '#4859f0',
        error: '#b71c1c',
      },
    },
  },
  icons: {
    values: {
      nashor: {
        component: NashorIcon
      },
      dragon: {
        component: DragonIcon
      },
      herald: {
        component: HeraldIcon
      }
    }
  }
}

export default new Vuetify(opts)
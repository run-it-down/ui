import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

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
    dark: true
  },
}

export default new Vuetify(opts)
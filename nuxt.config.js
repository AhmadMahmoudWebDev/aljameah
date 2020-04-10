import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    // localforage
    '@nuxtjs/localforage'
  ],
  /* local forage options */
  localforage: {
    instances: [{
      name: 'aljameah',
      storeName: 'occasions'
    }, {
      name: 'aljameah',
      storeName: 'latestNews'
    }, {
      name: 'aljameah',
      storeName: 'members'
    }, {
      name: 'aljameah',
      storeName: 'delegates'
    }, {
      name: 'aljameah',
      storeName: 'medicalEqs'
    }]
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-webfontloader'
  ],
  /*
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /* PWA */
  pwa: {
    workbox: {
      /* workbox options */
    },
    icon: {
      iconFileName: 'icon.jpg'
    }
  },
  webfontloader: {
    google: {
      families: ['Lemonada&display=swap']
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    defaultAssets: {
      font: {
        family: 'Lemonada'
      },
      icons: 'fa'
    },
    lang: {
      current: 'en'
    },
    rtl: true,
    treeShake: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
        config.performance.maxEntrypointSize = 10200000
      }
    }
  }
}

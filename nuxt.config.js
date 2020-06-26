
require('dotenv').config()
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script:[
      // google custom search api key
      // AIzaSyCGml9IZFOSHhwptmeBxpaX61qlW1NZz-4 
      // 017181384913421264509:ae3t0jdrxf4
      {
        src: 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      },
      {
        src: `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&libraries=services,clusterer`
      }

    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [ '@/assets/scss/config.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [ '@/plugins/ant.js' , '@/plugins/moment.js', '@/plugins/vue-datetime'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  env: {
    envData: process.env
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

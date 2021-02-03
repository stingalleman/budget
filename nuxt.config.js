export default {
  target: 'static',
  head: {
    title: 'Budget',
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: '' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, user-scalable=1, minimal-ui, viewport-fit=cover',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['~assets/scss/main.scss'],
  plugins: [],
  components: false,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/svg'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxt/content'],
  axios: {
    baseURL: 'https://522b4dc219a1.ngrok.io',
  },
  content: {},
  build: {},
}

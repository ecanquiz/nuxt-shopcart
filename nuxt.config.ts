// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '_nuxt/public/icon-512x512.svg' }]
    }
  },
  compatibilityDate: '2024-11-01',
  pages: {
    pattern: ['**/*.vue', '!**/components/**']
  },
  components: {
    dirs: ['~/components', {
      path: '~/pages',
      pattern: '**/components/**',
      pathPrefix: false
    }]
  },
  devtools: { enabled: true },
  experimental: {
    typedPages: true
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@vite-pwa/nuxt',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxtjs/i18n'
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  // Session configuration
  runtimeConfig: {
    session: {
      password: process.env.NUXT_SESSION_PASSWORD || 'default-session-password-32-characters-min',
      name: 'nuxt-session',
      cookie: {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      }
    },    
    // OAuth configuration
    oauth: {
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
      }
    },    
    // Public config that's exposed to the client
    public: {
      auth: {
        baseURL: process.env.NUXT_PUBLIC_AUTH_BASE_URL || 'http://localhost:3000',
      },
      APP_API_STATIC_SERVER_URL: process.env.APP_API_STATIC_SERVER_URL || 'http://localhost:9000'
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Shop-Cart',
      short_name: 'ShopCart',
      description: 'Tu tienda online',
      theme_color: '#2563eb',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'es',
        name: 'Spanish',
        file: 'es.json'
      }
    ],    
    langDir: './locales',
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts'
  }    
})
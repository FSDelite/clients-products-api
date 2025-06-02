/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { authRoutes } from './routes/auth_routes.js'
import { clientRoutes } from './routes/clients_routes.js'
import { ClientProductFavoritesRoutes } from './routes/client_products_favorites_routes.js'

router.get('/', async () => {
  return {
    message: 'All systems operational',
  }
})

router
  .group(() => {
    authRoutes
    clientRoutes
    ClientProductFavoritesRoutes
  })
  .prefix('v1')

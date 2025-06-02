import ClientProductFavoritesController from '#controllers/client_product_favorites_controller'
import router from '@adonisjs/core/services/router'

export const ClientProductFavoritesRoutes = router
  .group(() => {
    router.get('/:clientId', [ClientProductFavoritesController, 'index'])
    router.post('/:clientId', [ClientProductFavoritesController, 'store'])
  })
  .prefix('favorites')

import ClientsController from '#controllers/clients_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export const clientRoutes = router
  .group(() => {
    router.get('', [ClientsController, 'index'])
    router.get('/search', [ClientsController, 'search'])
    router.post('', [ClientsController, 'store'])
    router.put('/:id', [ClientsController, 'update'])
    router.delete('/:id', [ClientsController, 'destroy'])
  })
  .prefix('clients')
  .use([middleware.auth()])

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

export const authRoutes = router
  .group(() => {
    router.post('login', [AuthController, 'login'])
  })
  .prefix('auth')

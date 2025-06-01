import User from '#models/user'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.create({
      username: 'first_user',
      password: env.get('FIRST_USER_PASSWORD'),
      description: 'Administrator user',
    })
  }
}

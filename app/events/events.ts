import { BaseEvent } from '@adonisjs/core/events'

export default class Events extends BaseEvent {
  /**
   * Accept event data as constructor parameters
   */
  constructor() {
    super()
  }
  
}
import emitter from '@adonisjs/core/services/emitter'
import logger from '@adonisjs/core/services/logger'

emitter.on('db:query', function (query) {
  logger.debug(query)
})
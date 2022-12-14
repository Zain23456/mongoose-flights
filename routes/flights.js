import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

router.get('/', flightsCtrl.index)
//GET /movies/new
router.get('/new', flightsCtrl.new)

router.get('/:id', flightsCtrl.show)

router.get('/:id/edit', flightsCtrl.edit)

router.post('/', flightsCtrl.create)

router.post('/:id/ticket', flightsCtrl.createTicket)

router.post('/:id/meals', flightsCtrl.createMeal)

router.delete('/:id', flightsCtrl.delete)

router.put('/:id', flightsCtrl.update)

export {
  router
}

import { Flight } from '../models/flights.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res) {
  console.log(req.body)

  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights/new')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

export {
  newFlight as new,
  create,
}
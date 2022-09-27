import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  // console.log('BUTTON CLICK')
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res) {
  console.log(req.body)

  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights,
      title: 'All Flights'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

export {
  newFlight as new,
  create,
  index,
}
import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

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

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights/')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Details',
        flight,
        meals
      })
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function edit (req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: "Change Flight"
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function updateFlight(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(flight => {
    console.log(flight)
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function createMeal(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  updateFlight as update,
  createTicket,
  createMeal
}
import { Meal } from '../models/meal.js'

function newMeal(req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      title: "Add Meal",
      meals
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function createMeal(req, res) {
  Meal.create(req.body)
  .then(meal => {
    res.redirect('/meals/new')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  newMeal as new,
  createMeal as create
}
const router = require('express').Router();
let Evt = require('../models/event.model');

// Get All
router.route('/').get((req, res) => {
  Evt.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Single
router.route('/:id').get((req, res) => {
  Evt.findById(req.params.id)
    .then(evt => res.json(evt))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add New
router.route('/add').post((req, res) => {
  const evt = req.body

  const newEvent = new Evt(evt);

  newEvent.save()
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by Competition
router.route('/filter/byComp/:id').get((req, res) => {
  Evt.find()
    .then(events => {
      events = events.filter(event => event.competitions_used.includes(req.params.id));
      res.json(events)
    })
})

// Update Event
router.route('/update/:id').post((req, res) => {
  Evt.findById(req.params.id)
    .then(evt => {
      const { event_name, available_points, competitions_used } = req.body;

      evt.event_name = event_name;
      evt.available_points = available_points;
      evt.competitions_used = competitions_used;

      evt.save()
        .then(() => res.json('Event Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Event

module.exports = router;

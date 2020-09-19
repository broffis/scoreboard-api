const router = require('express').Router();
let Comp = require('../models/competition.model');

// Get All
router.route('/').get((req, res) => {
  Comp.find()
    .then(comps => res.json(comps))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Single
router.route('/:id').get((req, res) => {
  Comp.findById(req.params.id)
    .then(comp => res.json(comp))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add New
router.route('/add').post((req, res) => {
  const comp = req.body;

  const newComp = new Comp(comp);

  newComp.save()
    .then(() => res.json('Competition added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Group
router.route('/update/:id').post((req, res) => {
  Comp.findById(req.params.id)
    .then(comp => {
      const { name, date, logo } = req.body;
      
      comp.name = name;
      comp.date = date;
      comp.logo = logo;

      comp.save()
        .then(() => res.json('Country updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Competition

module.exports = router;

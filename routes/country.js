const router = require('express').Router();
let Country = require('../models/country.model');

// Get All
router.route('/').get((req, res) => {
  Country.find()
    .then(countries => res.json(countries))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Single
router.route('/:id').get((req, res) => {
  Country.findById(req.params.id)
    .then(country => res.json(country))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add New
router.route('/add').post((req, res) => {
  const { name, flag } = req.body;

  const newCountry = new Country({ name, flag});

  newCountry.save()
    .then(() => res.json('Country added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Country
router.route('/update/:id').post((req, res) => {
  Country.findById(req.params.id)
    .then(country => {
      const { name, flag } = req.body;

      country.name = name;
      country.flag = flag;

      country.save()
        .then(() => res.json('Country updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Country

module.exports = router;

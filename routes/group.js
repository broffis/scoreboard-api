const router = require('express').Router();
let Group = require('../models/group.model');

// Get All
router.route('/').get((req, res) => {
  Group.find()
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Single
router.route('/:id').get((req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by Tournament
router.route('/filter/byComp/:id').get((req, res) => {
  Group.find()
    .then(groups => {
      groups = groups.filter(group => group.competition_id === req.params.id)

      res.json(groups)
    })
})

// Add New
router.route('/add').post((req, res) => {
  const group = req.body;

  const newGroup = new Group(group);

  newGroup.save()
    .then(() => res.json('Group added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Group
router.route('/update/:id').post((req, res) => {
  Group.findById(req.params.id)
    .then(group => {
      const { group_name, competition_id, logo, backgroundColor, borderColor, heroColor } = req.body

      group.group_name = group_name;
      group.competition_id = competition_id;
      group.logo = logo;
      group.backgroundColor = backgroundColor;
      group.borderColor = borderColor;
      group.heroColor = heroColor;

      group.save()
        .then(() => res.json('Group updated'))
        .catch(err => res.status(400).json('Error:' + err))
    })
    .catch(err => res.status(400).json('Error:' + err))
})

// Delete Group

module.exports = router;

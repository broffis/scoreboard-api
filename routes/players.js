const router = require('express').Router();
let Player = require('../models/player.model');

let Country = require('../models/country.model');
let Group = require('../models/group.model');
let Comp = require('../models/competition.model');

let countries, groups, competitions;

Country.find().then(c => countries = c.map(val => {
  return {
    id: `${val._id}`,
    name: val.name,
    flag: val.flag
  };
}));
Group.find().then(g => groups = g.map(val => {
  return {
    id: `${val._id}`,
    name: val.group_name,
    logo: val.logo,
    competition_id: val.competition_id,
    background_color: val.backgroundColor,
    border_color: val.borderColor,
  };
}));
Comp.find().then(c => competitions = c.map(val => {
  return {
    id: `${val._id}`,
    name: val.name,
    date: val.date,
    logo: val.logo
  };
}));

// Get All
router.route('/').get((req, res) => {
  Player.find()
    .then(players => {
      let finalPlayers = players.map(p => {
        const data = p._doc;

        const [data_from_countries] = countries.filter(c => data.country_id === c.id);
        const [data_from_groups] = groups.filter(g => data.group_id === g.id);
        // const [data_from_comps] = competitions.filter(cp => data.competition_id === cp.id);

        return {
          ...data,
          country_name: data_from_countries.name,
          country_flag: data_from_countries.flag,
          group_name: data_from_groups.name,
          background_color: data_from_groups.background_color,
          border_color: data_from_groups.border_color
        }
      })
      
      res.json(finalPlayers);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Single
router.route('/:id').get((req, res) => {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by Group
router.route('/filter/byGroup/:id').get((req, res) => {
  Player.find()
    .then(players => {
      players = players.filter(p => p.group_id === req.params.id)
        .map(p => {
          const data = p._doc;

          const [data_from_countries] = countries.filter(c => data.country_id === c.id);
          const [data_from_groups] = groups.filter(g => data.group_id === g.id);

          return {
            ...data,
            country_name: data_from_countries.name,
            country_flag: data_from_countries.flag,
            group_name: data_from_groups.name,
          }
        })
      res.json(players)
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

// Add New
router.route('/add').post((req, res) => {
  const player = req.body;

  const newPlayer = new Player(player);

  newPlayer.save()
    .then(() => res.json('Player added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Update Player
router.route('/update/:id').post((req, res) => {
  Player.findById(req.params.id)
    .then(player => {
      const { name, country_id, group_id, competition_id } = req.body;

      player.name = name;
      player.country_id = country_id;
      player.group_id = group_id;
      player.competition_id = competition_id;

      player.save()
        .then(() => res.json('Player updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Player
router.route('/:id').delete((req, res) => {
  Player.findByIdAndDelete(req.params.id)
    .then(() => res.json('Player deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;

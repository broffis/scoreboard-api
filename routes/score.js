const router = require('express').Router();
let Score = require('../models/score.model');

let Player = require('../models/player.model');
let Evt = require('../models/event.model');
let Country = require('../models/country.model');
let Group = require('../models/group.model');
let Comp = require('../models/competition.model');

let players, evts, countries, groups, competitions;

Player.find().then(p => players = p.map(val => {
  return {
    id: `${val._id}`,
    name: val.name,
    country_id: val.country_id,
    group_id: val.group_id,
    competition_id: val.competition_id
  };
}));
Evt.find().then(e => evts = e.map(val => {
  return {
    id: `${val._id}`,
    name: val.event_name,
    available_points: val.available_points
  };
}));
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
  Score.find()
    .then(scores => {
      let finalScores;

      if (scores.length === 0 ) {
        finalScores = [];

        players.forEach(player => {
          const [data_from_groups] = groups.filter(g => player.group_id === g.id);
          const [data_from_countries] = countries.filter(c => player.country_id === c.id);

          evts.forEach(evt => {
            let data = {
              points: 0,
              player_name: player.name,
              player_id: player.id,
              event_name: evt.event_name,
              country_name: data_from_countries.name,
              country_flag: data_from_countries.flag,
              background_color: data_from_groups.background_color,
              border_color: data_from_groups.border_color,
              competition_id: player.competition_id
            }

            finalScores.push(data);
          })
        })
      } else {
        finalScores = scores.map(sc => {
          const data = sc._doc;

          const [data_from_players] = players.filter(p => data.player_id === p.id);
          const [data_from_evts] = evts.filter(e => data.event_id === e.id);
          const [data_from_countries] = countries.filter(c => data_from_players.country_id === c.id);
          const [data_from_groups] = groups.filter(g => data_from_players.group_id === g.id);

          return {
            ...data,
            player_name: data_from_players.name,
            event_name: data_from_evts.name,
            country_name: data_from_countries.name,
            country_flag: data_from_countries.flag,
            background_color: data_from_groups.background_color,
            border_color: data_from_groups.border_color
          }
        });
      }
      res.json(finalScores);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Single
router.route('/:id').get((req, res) => {
  Score.findById()
    .then(score => res.json(score))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Filter by Event
router.route('/filter/byEvent/:id').get((req, res) => {
  Score.find()
    .then(scores => {
      scores = scores.filter(score => score.event_id === req.params.id)
        .map(sc => {
          const data = sc._doc;

          const [data_from_players] = players.filter(p => data.player_id === p.id);
          const [data_from_evts] = evts.filter(e => data.event_id === e.id);
          const [data_from_countries] = countries.filter(c => data_from_players.country_id === c.id);
          const [data_from_groups] = groups.filter(g => data_from_players.group_id === g.id);

          return {
            ...data,
            player_name: data_from_players.name,
            event_name: data_from_evts.name,
            country_name: data_from_countries.name,
            country_flag: data_from_countries.flag,
            background_color: data_from_groups.background_color,
            border_color: data_from_groups.border_color
          }
        })
      res.json(scores);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by Group
router.route('/filter/byGroup/:id').get((req, res) => {
  Score.find()
    .then(scores => {
      let finalScores;

      if (scores.length === 0 ) {
        finalScores = [];

        players.forEach(player => {
          const [data_from_groups] = groups.filter(g => player.group_id === g.id);
          const [data_from_countries] = countries.filter(c => player.country_id === c.id);

          evts.forEach(evt => {
            let data = {
              points: 0,
              player_name: player.name,
              player_id: player.id,
              event_name: evt.event_name,
              country_name: data_from_countries.name,
              country_flag: data_from_countries.flag,
              background_color: data_from_groups.background_color,
              border_color: data_from_groups.border_color,
              competition_id: player.competition_id
            }

            finalScores.push(data);
          })
        })
      } else { 
        finalScores = scores.filter(score => score.group_id === req.params.id)
        .map(sc => {
          const data = sc._doc;

          const [data_from_players] = players.filter(p => data.player_id === p.id);
          const [data_from_evts] = evts.filter(e => data.event_id === e.id);
          const [data_from_countries] = countries.filter(c => data_from_players.country_id === c.id);
          const [data_from_groups] = groups.filter(g => data_from_players.group_id === g.id);
  
          return {
            ...data,
            player_name: data_from_players.name,
            event_name: data_from_evts.name,
            country_name: data_from_countries.name,
            country_flag: data_from_countries.flag,
            background_color: data_from_groups.background_color,
            border_color: data_from_groups.border_color
          }
        });
      }
      
      res.json(finalScores);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by Competition
router.route('/filter/byComp/:id').get((req, res) => {
  Score.find()
    .then(scores => {
      let finalScores;

      if (scores.length === 0 ) {
        finalScores = [];

        players.forEach(player => {
          const [data_from_groups] = groups.filter(g => player.group_id === g.id);
          const [data_from_countries] = countries.filter(c => player.country_id === c.id);

          evts.forEach(evt => {
            let data = {
              points: 0,
              player_name: player.name,
              player_id: player.id,
              event_name: evt.event_name,
              country_name: data_from_countries.name,
              country_flag: data_from_countries.flag,
              background_color: data_from_groups.background_color,
              border_color: data_from_groups.border_color,
              competition_id: player.competition_id
            }

            finalScores.push(data);
          })
        })
      } else {
        finalScores = scores.filter(score => score.competition_id === req.params.id)
        .map(sc => {
          const data = sc._doc;

          const [data_from_players] = players.filter(p => data.player_id === p.id);
          const [data_from_evts] = evts.filter(e => data.event_id === e.id);
          const [data_from_countries] = countries.filter(c => data_from_players.country_id === c.id);
          const [data_from_groups] = groups.filter(g => data_from_players.group_id === g.id);

          return {
            ...data,
            player_name: data_from_players.name,
            event_name: data_from_evts.name,
            country_name: data_from_countries.name,
            country_flag: data_from_countries.flag,
            background_color: data_from_groups.background_color,
            border_color: data_from_groups.border_color
          }
        });
      }
      
      res.json(finalScores);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by Player
router.route('/filter/byPlayer/:id').get((req, res) => {
  Score.find()
    .then(scores => {
      scores = scores.filter(score => score.player_id === req.params.id)
        .map(sc => {
          const data = sc._doc;

          const [data_from_players] = players.filter(p => data.player_id === p.id);
          const [data_from_evts] = evts.filter(e => data.event_id === e.id);
          const [data_from_countries] = countries.filter(c => data_from_players.country_id === c.id);
          const [data_from_groups] = groups.filter(g => data_from_players.group_id === g.id);

          return {
            ...data,
            player_name: data_from_players.name,
            event_name: data_from_evts.name,
            country_name: data_from_countries.name,
            country_flag: data_from_countries.flag,
            background_color: data_from_groups.background_color,
            border_color: data_from_groups.border_color
          }
        });
      res.json(scores);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// Add New
router.route('/add').post((req, res) => {
  const { player_id, group_id } = req.body;
  const { event_id, points, competition_id } = req.body.score;

  const score = {
    player_id,
    group_id,
    event_id,
    points,
    competition_id,
    created_by_user_id: "5f4968c84d31ce9fde32e1a4"
  }

  const newScore = new Score(score);

  newScore.save()
    .then(res.json('Score added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Score
router.route('/update/:id').post((req, res) => {
  Score.findById(req.params.id)
    .then(score => {
      const { event_id, points, competition_id } = req.body.score;
      const { player_id, group_id } = req.body;

      score.player_id = player_id;
      score.group_id = group_id;
      score.event_id = event_id;
      score.points = points;
      score.competition_id = competition_id;

      score.save()
        .then(() => res.json('Score updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

// Delete Score
router.route('/:id').delete((req, res) => {
  Score.findByIdAndDelete(req.params.id)
    .then(() => res.json('Score deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
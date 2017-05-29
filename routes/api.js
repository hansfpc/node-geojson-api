const express = require('express');
const router = express.Router();
const DevModel = require('../models/dev');

// Get a list of devs from the DB
router.get('/devs', (req, res, next) =>{
  DevModel.geoNear(
    { type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
    { maxDistance: 100000, spherical: true }
    ).then((devs)=>{
    res.send(devs);
  });
  /*DevModel.find({}).then((devs)=>{
    res.send(devs);
  })*/
});

// Add a new dev to the DB
router.post('/devs', (req, res, next) =>{
  DevModel.create(req.body).then((dev)=>{
    res.send(dev);
  }).catch(next);
  //let dev = new Dev(req.body); //new instance of the Dev Model with obtained post request data
  //dev.save(); // save req.body into dev collection
});

// Update a dev in the DB
router.put('/devs/:id', (req, res, next) =>{
  DevModel.findByIdAndUpdate({ _id: req.params.id }, req.body).then(()=>{
    DevModel.findOne({ _id: req.params.id}).then((dev)=>{
      res.send(dev);
    })
  }).catch(next);
});

// Delete a dev from the DB
router.delete('/devs/:id', (req, res, next) =>{
  DevModel.findByIdAndRemove({ _id: req.params.id }).then((dev)=>{
    res.send(dev);
  }).catch(next);
});

module.exports = router;
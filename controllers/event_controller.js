const event = require('express').Router()
const db = require('../models')
const { Event} = db

// FIND ALL Events
event.get('/', async (req, res) => {
  try {
    const foundEvents = await Event.findAll()
    res.status(200).json(foundEvents)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// FIND A SPECIFIC event
event.get('/:id', async (req, res) => {
  try {
    const foundEvent = await Event.findOne({
      where: {band_id: req.params.id}
    })
    res.status(200).json(foundEvent)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// CREATE An event
event.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body)
    res.status(200).json({
      message: 'Successfully inserted a new event',
      data: newEvent
    })
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE An event
event.put('/:id', async (req, res) => {
  try {
    const updatedEvents = await Event.update(req.body, {
      where: {
        band_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully updated ${updatedEvents} event(s)`
    })
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// DELETE An event
event.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.destroy({
      where: {
        band_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully deleted ${deletedEvents} event(s)`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// EXPORT
module.exports = event
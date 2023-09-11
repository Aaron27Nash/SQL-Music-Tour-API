const stage = require('express').Router()
const db = require('../models')
const { Stage } = db 
const {Op} = require ('sequelize')

// FIND ALL BANDS
stage.get('/', async (req, res) => {
    try {
        const foundStages = await Band.findAll({ 
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name:{ [ Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            } 
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC BAND
stage.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
stage.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch(err) {
      res.status(500).json(err)
    }
})

// UPDATE A BAND
stage.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
stage.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// EXPORT
module.exports = stage

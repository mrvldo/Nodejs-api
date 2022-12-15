// (5) Buat router Mahasiswa
const express = require('express')
const router = express.Router()
const Mahasiswa = require('../models/Mahasiswa')
const verifyToken = require('../config/verifyToken')
// Create 
router.post('/', async (req, res) => {
    // tampung input mahasiswa 
    const mahasiswaPost = new Mahasiswa({
        nama: req.body.nama,
        alamat: req.body.alamat
    })

    try {
        // simpan data 
        const mahasiswa = await mahasiswaPost.save()
        // response (data yang sebelumnya disimpan akan ditampilkan pada response)
        res.json(mahasiswa)
    }
    // Response error
    catch (error) {
        res.json({
            message: error
        })
    }
})

// Read data(method get)
router.get('/', verifyToken, async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.find()
        res.json(mahasiswa)
    } catch (error) {
        res.json({
            message: error
        })
    }
})

// Update 
router.put('/:mahasiswaId', async (req, res) => {
    // tampung input mahasiswa 
    const data = {
        nama: req.body.nama,
        alamat: req.body.alamat
    }

    try {
        // update data 
        const mahasiswa = await Mahasiswa.updateOne({
            _id: req.params.mahasiswaId
        }, data)
        // response
        res.json(mahasiswa)
    } catch (error) {
        res.json({
            message: error
        })
    }
})

// Method Delete
router.delete('/:mahasiswaID', async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.deleteOne({
            _id: req.params.mahasiswaID
        })
        res.json(mahasiswa)
    } catch (error) {
        res.jsonmessage({
            message: error
        })
    }
})

module.exports = router

// Router digunakan untuk mengakses alamat data pada server
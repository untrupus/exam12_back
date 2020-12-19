const express = require('express');
const router = express.Router();
const config = require("../config");
const Photo = require('../models/Photo');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    let query;
    if (req.query.user) {
        query = {user: req.query.user}
    }
    const result = await Photo.find(query).populate({path: "user"});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', [auth, config.upload.single("image")], async (req, res) => {
    const photoData = req.body;
    photoData.user = req.user._id;
    if (req.file) {
        photoData.image = req.file.filename;
    }
    const photo = new Photo(photoData)
    try {
        await photo.save();
        res.send(photo);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const result = await Photo.findById({_id: req.params.id});
    if (result.user.equals(req.user._id)) {
        const remove = await Photo.findByIdAndRemove({_id: req.params.id});
        if (remove) {
            res.send("Photo removed");
        } else {
            res.sendStatus(404);
        }
    } else {
        res.status(401).send({message: 'Access denied'});
    }

});

module.exports = router;
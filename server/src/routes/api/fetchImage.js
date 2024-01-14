// routes/api/image.js
const express = require('express');
const router = express.Router();
const Image = require('../../models/Image');
const {mongoConfig,mongoDisconnect}= require('../../dbconfig')
// @route  GET api/image/
// @desc   Get image by form data parameters
// @access Public
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        await mongoConfig();
        var image = await Image.find(req.body);
        if (!image) {
            return res.status(400).json({ msg: 'Image not found' });
        }
        var ids=[]
        for(let i=0;i<image.length;i++){
            ids.push(image[i]._id)
            console.log(ids)
        }
        await mongoDisconnect()
        return res.status(200).json({ id: ids });
        } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
        }
    });

module.exports = router;
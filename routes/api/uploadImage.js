const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Image = require('../../models/Image');

const {recognizeImageText,checkWordNet}=require('../../controllers/recogniseText')
const {neoCreateImageNode}=require('../../controllers/neo4jScripts')
const {mongoConfig,mongoDisconnect,neoDriverOpen, neoDriverClose}= require('../../dbconfig')
const fs=require('fs')
// Handle file upload
router.post('/', upload.array('file',10), async (req, res) => {
    try {
        await mongoConfig();
        const filePromises = req.files.map(async (file) => {
            const text = await recognizeImageText(file);
            const fileData = file.buffer;
            const base64Data = fileData.toString('base64');
            
            const imageObj={
                image: base64Data,
                imageName: file.originalname,
                image_name: req.body.image_name,
                category: req.body.category,
                keywords: req.body.keywords,
                created_date: String(req.body.created_date)
            }
            await new Image(imageObj).save();
            await mongoDisconnect();

            delete(imageObj.image)
            const linkWordSet = new Set();
            for(let j=0;j<text.length;j++){
                const linkWordMeaning = await checkWordNet(text[j])  
                if(linkWordMeaning !== ""){
                    linkWordSet.add(text[j])
                }
            }
            imageObj['linkwords'] = Array.from(linkWordSet);
            await neoCreateImageNode(imageObj, await neoDriverOpen())
            await neoDriverClose()
        });
        await Promise.all(filePromises);
        fileData=[];
        req.body={};
        
        res.status(200).json({ message: 'Image uploaded successfully' });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading image' });
    }
});

router.get('/:id', async (req, res) => {
    try{
    	var image = await Image.findById(req.params.id);
      	if (!image) {
        	return res.status(404).json({ message: 'Image not found' });
      	}
      	res.set('Content-Type', 'image/jpeg');
      	res.status(200).json({image:image.image});  
    }catch (error){
      	console.error(error);
      	res.status(500).json({ message: 'Error retrieving image' });
    }
});
module.exports = router;
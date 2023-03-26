const { Router }= require('express')
const router = Router()
const neoSearch =require('../../controllers/neoSearchQueries')
const {neoDriverOpen, neoDriverClose}= require('../../dbconfig')
router.post('/',async (req, res) => {
    try{
        var searchWords=req.body.searchword.split(" ");
        var finalRes=[]
        for(let i=0;i<searchWords.length;i++){
            let  word=searchWords[i]
            await neoDriverOpen()
            if(req.body.category){
                var resImage
                resImage=await neoSearch.neoLinkwordByCategory(word)
            }
            else if(req.body.keyword){
                var resImage
                resImage=await neoSearch.neoLinkwordByKeyword(word)
            }
            else{
                var resImage
                resImage=await neoSearch.neoLinkwordByName(word)
            }
            resImage.forEach(element => {
                element['searchword']=word;
                element['category']=element.category.join();
                element['keywords']=element.keywords.join();
            });
            finalRes=finalRes.concat(resImage)
            await neoDriverClose()
        }
        console.log(finalRes)
        //neoSearch.neoLinkWodByName(i)
        res.status(200).json(finalRes)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router
const router = require("express").Router();
const album = require("../models/album");


router.post("/save", async (req, res) =>{
    const newAlbum = album(
        {
            name: req.body.name,
            imageURL: req.body.imageURL,
        });
    try {
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({success: true, album: savedAlbum});
    }catch(error){
        return res.status(400).send({success: false, msg: error});
    }
});

router.get("/getOne/:id", async (req, res) => {
    const filter = {_id: req.params.id };

    const data = await album.findOne(filter);
    if(data){
        return res.status(200).send({ success: true, album: data});
    }else{
        return res.status(400).send({success: false, msg: "Data not found"});
    } //video 1:06:31
});

router.get('/getAll', async (req, res) =>{
    const data = await album.find().sort( { createdAt: 1 } )
    if(data){
        return res.status(200).send({ success: true, album: data});
    }else{
        return res.status(400).send({success: false, msg: "dATA NOT FOUND"});
    } //video 1:06:31 
});

router.put("/update/:id", async (req, res) => {
    const filter = {_id: req.params.id};
    const options = {
        upsert: true,
        new: true
    };

    try{
        const result = await album.findOneAndUpdate(filter, 
        {
            name: req.body.name,
            imageURL: req.body.imageURL,
        }, options ); 

        return res.status(200).send({success:true, data: result});
    }catch(error){
        return res.status(400).send({success: false, msg: error });     
    }

});

router.delete("/delete/:id", async (req, res) => {
    const filter = {_id: req.params.id};

    const result = await album.deleteOne(filter);
    if(result){
        return res.status(200).send({ success: true, msg: "Data removed", data: result});
    }else{
        return res.status(400).send({success: false, msg: "dATA NOT FOUND"});
    }
});

module.exports = router;
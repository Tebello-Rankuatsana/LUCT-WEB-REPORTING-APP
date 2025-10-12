const { getPRLById, updatePRL, deletePRL } = require('../models/PrincipalLecturerModel');

// getting all lecturers
async function getPRL(req,res){
    try{
        const prl = await PRL.getPRL();
        res.json(prl);
    }catch(err){
        res.status(404).json({message:'not found'});
    }
}
// getting lecturers by id
async function getPRLById(req,res) {
    try{
        const prl = await PRL.getLecturersById(req.params.id);
        if(!prl) return res.status(404).json({message:'not found'});
        req.json(lecturer);
    }
    catch(err){
        res.status(500).json({message:'Fetching Error'});
    }
}
// updating lecturer data(adding new values)
async function updateLecturer(req,res) {
    try{
        const {name} = req.body;
        const prl = await PRL.updateLecturer(req.params.id, name);
        if(!prl) return res.status(404).json({message:'not found'});
        req.json(prl);
    }
    catch(err){
        res.status(500).json({message:'updating error'});
    }
}
// deleting lecturer
async function deleteLecturer(req,res){
    try{
        const prl = await PRL.deleteLecturer(req.params.id);
        if(!prl) return res.status(404).json({message:'not found'});
        req.json(prl);
    }catch(err){
        res.status(500).json({message:'deletion error'});
    }
}

module.exports = {getPRL,getPRLById,updatePRL,deletePRL};
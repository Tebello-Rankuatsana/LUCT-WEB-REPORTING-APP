// getting all lecturers
async function getLecturers(req,res){
    try{
        const lecturer = await Lecturer.getAllLecturers();
        res.json(lecturer);
    }catch(err){
        res.status(404).json({message:'Lecturers not found'});
    }
}
// getting lecturers by id
async function getLecturersById(req,res) {
    try{
        const lecturer = await Lecturer.getLecturersById(req.params.id);
        if(!lecturer) return res.status(404).json({message:'Student not found'});
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
        const lecturer = await Lecturer.updateLecturer(req.params.id, name);
        if(!lecturer) return res.status(404).json({message:'student not found'});
        req.json(lecturer);
    }
    catch(err){
        res.status(500).json({message:'updating error'});
    }
}
// deleting student
async function deleteLecturer(req,res){
    try{
        const lecturer = await Lecturer.deleteLecturer(req.params.id);
        if(!lecturer) return res.status(404).json({message:'lecturer not found'});
        req.json(lecturer);
    }catch(err){
        res.status(500).json({message:'deletion error'});
    }
}

module.exports = {getLecturers,getLecturersById,updateLecturer,deleteLecturer};
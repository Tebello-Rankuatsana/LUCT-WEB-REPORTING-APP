// getting all students
async function getStudents(req,res){
    try{
        const students = await Student.getAllStudents();
        res.json(students);
    }catch(err){
        res.status(404).json({message:'Students not found'});
    }
}
// getting students by id
async function getStu(req,res) {
    try{
        const student = await Student.getStudentsById(req.params.id);
        if(!student) return res.status(404).json({message:'Student not found'});
        req.json(student);
    }
    catch(err){
        res.status(500).json({message:'Fetching Error'});
    }
}
// updating student data(adding new values)
async function updateStudent(req,res) {
    try{
        const {name} = req.body;
        // the arguments could be req.params.id , name
        // params - routing parameters
        // req.params.id essentially mean give me the value of the :id placeholder in the URL
        // accessing the id that was passed in the URL
        const student = await Student.updateStudent(req.params.id, name);
        if(!student) return res.status(404).json({message:'student not found'});
        req.json(student);
    }
    catch(err){
        res.status(500).json({message:'updating error'});
    }
}
// deleting student
async function deleteStudent(req,res){
    try{
        const student = await Student.deleteStudent(req.params.id);
        if(!student) return res.status(404).json({message:'student not found'});
        req.json(student);
    }catch(err){
        res.status(500).json({message:'deletion error'});
    } 
}
module.exports = {getStudents,getStu,updateStudent,deleteStudent};

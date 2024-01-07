const express = require("express");
const uuid = require('uuid')
const members = require("../../Members");
const router = express.Router();
//Get All Members
router.get("/", (req, res) => {
  res.json(members);
});
//Get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    return res.json(
      members.filter((member) => member.id === parseInt(req.params.id))
    );
  }
  // res.send(400,`No member with the member id ${req.params.id}`)
  res
    .status(400)
    .json({ msg: `No member with the member id ${req.params.id}` });
});

//Create Member
router.post("/", (req, res) => {
  // res.send(req.body);
  const newMember = {
id: uuid.v4(),
name: req.body.name,
email: req.body.email,
status: 'active'
  }
  if(!newMember.name || !newMember.email){
  return  res.status(400).json({'msg': 'Please include a name and and email'})
  }
  members.push(newMember);
  // res.json(members)
  res.redirect('/')
});

//Update Member
router.put('/:id', (req,res)=>{
  const found = members.some(member => member.id === parseInt(req.params.id))
  if(found){
   const updMember = req.body;
   members.forEach(member=>{
    if(member.id === parseInt(req.params.id)){
      member.name = updMember.name? updMember.name: member.name;
      member.email = updMember.email? updMember.email: member.email;
      res.json({msg: 'Members updated',member})
    }
   })
  }else{
    res.status(400).json({msg: `No member with the id ${req.params.id}`})
  }
})

//Delete Member
router.delete('/:id', (req,res)=>{
  const found = members.some(member => member.id === parseInt(req.params.id))
  if(found){
res.json({msg: `Member with id ${req.params.id} deleted`, member: members.filter(member=>member.id !== parseInt(req.params.id))})
  }
  else{
    res.status(400).json({msg: `No member with the id ${req.params.id}`})
  }
})
module.exports = router;

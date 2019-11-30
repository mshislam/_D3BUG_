const express = require("express");

const jwt = require('jsonwebtoken')
const router = express.Router();

const passport = require('passport')
const User = require('../../models/User');

const bcrypt = require('bcryptjs');

router.post('/register',passport.authenticate("jwt",{session: false }), async (req, res) => {

	try {

		console.log("where are uuuuuuuuuuuuuuuuu")
		if(!req.body.Email)
		return res.status(400).send({ error:'Please Enter An Email'})

		if(!req.body.Password)

		return res.status(400).send({ error:'Please Enter Password'})

		const user = await User.findOne( {'Email':req.body.Email});
		if (user) 

			return res.status(400).json({ error: 'Email already exists' });

		const salt = bcrypt.genSaltSync(10);

		const hashedPassword = bcrypt.hashSync(req.body.Password, salt);

		req.body.Hashed_password=hashedPassword;

		const newUser=await User.create(req.body);

		const Z=await User.findOne({'_id':newUser._id})

		

		

    // setup email data with unicode symbols


		res.json({ msg: 'User created successfully', data: Z });

	} catch (error) {

		console.log(error)

		res.status(422).send({ error: 'Can not create user' });

	}

});

router.put('/addcategory',passport.authenticate("jwt",{session: false }),async (req, res) => {

	const X=await User.findOne({'_id':req.user._id})
	

if(req.user.Categories.includes(req.body.Category)){
	return res.status(400).send({ error:'Category already exists'})
}

	const UserCategories=X.Categories

	UserCategories.push(req.body.Category)

	await X.updateOne({'Categories':UserCategories})

	
	res.json({msg:'OK', data: X })

})


router.put('/addword',passport.authenticate("jwt",{session: false }), async (req, res) => {
	const X=await User.findOne({'_id':req.user._id})
	
	
for(var i =0 ;i<X.Vocabulary.length;i++){

	if(X.Vocabulary[i].Category==req.body.Category  &&X.Vocabulary[i].Word==req.body.Word){


		return	 res.status(400).send({ error:'the word with the same translation exists in the same category'})
		}
}
const newVocab = {
	Word:req.body.Word,
	Translation:req.body.Translation,
	From:req.body.From,
	To:req.body.To,
	Category:req.body.Category
};

	const vocab=X.Vocabulary

	vocab.push(newVocab)

	await X.updateOne({'Vocabulary':vocab})


  
	
	res.json({msg:'OK', data: X })

})

router.get('/finduser/:id', async (req, res) => {

	const X = await User.findOne({"_id":req.params.id})



	
	res.json({ data: X })

})
module.exports = router;

//5de13d1b7a07e63914601a1c

module.exports = router;

const { userModel } = require('../models');
const bcrypt = require('bcrypt');
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class userController {
    static async register (req, res) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(req.body.password, salt)

            const validateEmail = await userModel.findOne({email: req.body.email})
            const validateHp = await userModel.findOne({email: req.body.handphone})

            if (validateEmail || validateHp) {
                throw {name: 'Authentication Failed', message: "There are another"} //perbaiki validasi
            }

            let userRegister = new userModel({
                name: req.body.name,
                email: req.body.email,
                handphone: req.body.handphone,
                password: hashedPass
            })
    
            const user = await userRegister.save();
            res.status(201).json(user)
            
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async login (req, res) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }


        if (obj.email == '' || obj.email == '') {
            throw {name: 'Authentication Failed', message: "Please required Email and password"}
        }
        console.log(obj.email)

        await userModel.findOne({
            email: obj.email
        })
        .then(data => {
            console.log(data, 'data')
            if (!data) {
                throw {name: 'Authentication Failed', message: "Wrong Email/password!"}
              } else if (!comparePassword(obj.password, data.password)) {
                throw{
                  name: 'Authentication Failed', 
                  message: "Wrong Email/password!"
                }
              } else {
                const access_token = signToken({
                  id: data.id,
                  email: data.email
                })
                console.log(access_token, 'access_token')
                res.status(201).json({message: "Success", access_token})
              }
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}


module.exports = userController;

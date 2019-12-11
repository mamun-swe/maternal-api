const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../../modals/admin/admin')


const createAdmin = (req, res) => {
    let name = "admin";
    let email = "admin@gmail.com";
    let password = "admin";
    Admin.findOne({ email: email })
        .then(admin => {
            if (admin) {
                res.status(200).json({
                    message: 'exist'
                })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    const newAdmin = new Admin({
                        name: name,
                        email: email,
                        password: hash
                    })

                    newAdmin.save()
                        .then(data => {
                            if (data) {
                                res.status(201).json({
                                    message: 'success'
                                })
                            }
                        })
                        .catch(err => {
                            if (err) {
                                res.status(501).json({
                                    message: 'error'
                                })
                            }
                        })
                })
            }
        })
        .catch(err => {
            if (err) {
                res.status(501).json({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}



const adminLogin = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    Admin.findOne({ email })
        .then(admin => {
            if (admin) {
                bcrypt.compare(password, admin.password, (err, result) => {
                    if (err) {
                        res.json({
                            message: 'error'
                        })
                    }
                    if (result) {
                        const token = jwt.sign({ _id: admin._id }, 'SECRET',
                            { expiresIn: '30d' })
                        res.status(200).json({
                            message: 'success',
                            token,
                            id: admin._id
                        })
                    } else {
                        res.status(204).json({
                            message: 'not found'
                        })
                    }
                })

            } else {
                res.status(501).json({
                    message: 'error'
                })
            }
        })
        .catch(err => {
            res.status(501).json({
                message: 'error'
            })
        })
}



module.exports = {
    createAdmin,
    adminLogin
}
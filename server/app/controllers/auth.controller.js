const db = require('../models')
require('dotenv').config({ path: '../../config.env' })
const User = db.user
const Algorithm = db.algorithm
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path =
  process.env.home + process.env.username + process.env.pathDocker + process.env.resources

const Op = db.Sequelize.Op

exports.signupClient = (req, res) => {
  // Save User to Database
  let branch = '0000'
  const id = uuidv4()
  if (req.body.unique === true) {
    branch = id
  }
  User.create({
    id: id,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
    id_account: id,
    id_branch: branch,
    cameras: req.body.cameras,
    analytics: req.body.analytics,
    role: 'client',
    disabled: '0'
  })
    .then(user => {
      if (req.body.algorithm) {
        Algorithm.findAll({
          where: {
            name: {
              [Op.or]: req.body.algorithm
            }
          }
        }).then(roles => {
          user.setAlgorithms(roles).then(() => {
            const pathPic = `${path}${user.id_account}`
            if (!fs.existsSync(pathPic)) {
              fs.mkdirSync(pathPic)
            }
            if (req.body.unique === true) {
              const pathBranch = `${pathPic}/${branch}`
              fs.mkdirSync(pathBranch)
              fs.mkdirSync(`${pathBranch}/pictures`)
              fs.mkdirSync(`${pathBranch}/heatmap_pics`)
            }
            res.status(201).send({ message: 'User was registered successfully!' })
          })
        })
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.signupBranch = (req, res) => {
  const token = req.headers['x-access-token']

  jwt.verify(token, process.env.secret, (_err, decoded) => {
    // Save User to Database
    const id = uuidv4()
    User.create({
      id: id,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
      id_account: decoded.id_account,
      id_branch: id,
      cameras: req.body.cameras,
      analytics: req.body.analytics,
      role: 'branch',
      disabled: '0'
    })
      .then(user => {
        const pathPic = `${path}${user.id_account}/${user.id_branch}`
        if (!fs.existsSync(pathPic)) {
          fs.mkdirSync(pathPic)
          fs.mkdirSync(`${pathPic}/pictures`)
          fs.mkdirSync(`${pathPic}/heatmap_pics`)
        }
        res.status(201).send({ message: 'User was registered successfully!' })
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  })
}

exports.signupUser = (req, res) => {
  const token = req.headers['x-access-token']

  jwt.verify(token, process.env.secret, (_err, decoded) => {
    User.create({
      id: uuidv4(),
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
      id_account: decoded.id_account,
      id_branch: decoded.id_branch,
      role: 'user',
      disabled: '0'
    })
      .then(user => {
        res.status(201).send({ success: true, message: 'User was registered successfully!' })
      })
      .catch(err => {
        res.status(500).send({ success: false, message: err.message })
      })
  })
}

exports.signupAdmin = (req, res) => {
  User.create({
    id: uuidv4(),
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
    role: 'admin',
    disabled: '0'
  })
    .then(user => {
      res.status(201).send({ success: true, message: 'User was registered successfully!' })
    })
    .catch(err => {
      res.status(500).send({ success: false, message: err.message })
    })
}

let usersIn = []

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: 'User is not in the records', type: 'user' })
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(400).send({
          success: false,
          message: 'Invalid Password',
          type: 'password'
        })
      }
      if (user.disabled === 1) {
        return res.status(401).send({
          success: false,
          message: 'This account has been disabled, please get in contact with the Administator.',
          type: 'disable'
        })
      }
      const exp = 43200

      const token = jwt.sign(
        { id: user.id, id_account: user.id_account, id_branch: user.id_branch },
        process.env.secret,
        {
          expiresIn: exp // 12 hours
        }
      )

      res.status(200).send({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          id_account: user.id_account,
          id_branch: user.id_branch,
          cameras: user.cameras,
          analytics: user.analytics,
          accessToken: token
        }
      })
    })
    .catch(err => {
      res.status(500).send({ success: false, message: err.message })
    })
}

exports.check = (req, res) => {
  res.status(200).send({ success: true, message: 'Session still active' })
}

exports.loggOut = (req, res) => {
  const data = req.body
  for (let a = 0; a < usersIn.length; a++) {
    if (data.username === usersIn[a].name) {
      usersIn = arrayRemove(usersIn, data.username)
      return res.status(200).send({ success: true, message: 'Logged Out' })
    }
  }
  res.status(500).send({ success: false, message: 'Session not found' })
}

function arrayRemove (arr, value) {
  return arr.filter(function (ele) {
    return ele.name !== value
  })
}

exports.googleLogin = (req, res) => {
  const data = req.body

  User.findOne({
    where: {
      email: data.data.email
    }
  })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: 'User is not in the records', type: 'user' })
      }

      if (user.disabled === 1) {
        return res.status(401).send({
          success: false,
          message: 'This account has been disabled, please get in contact with the Administator.',
          type: 'disable'
        })
      }
      const exp = 43200

      const token = jwt.sign(
        { id: user.id, id_account: user.id_account, id_branch: user.id_branch },
        process.env.secret,
        {
          expiresIn: exp // 12 hours
        }
      )

      res.status(200).send({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          id_account: user.id_account,
          id_branch: user.id_branch,
          cameras: user.cameras,
          analytics: user.analytics,
          accessToken: token
        }
      })
    })
    .catch(err => {
      res.status(500).send({ success: false, message: err.message })
    })
}

exports.msLogin = (req, res) => {
  const data = req.body
  User.findOne({
    where: {
      email: data.data.account.username
    }
  })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: 'User is not in the records', type: 'user' })
      }

      if (user.disabled === 1) {
        return res.status(401).send({
          success: false,
          message: 'This account has been disabled, please get in contact with the Administator.',
          type: 'disable'
        })
      }
      const exp = 43200

      const token = jwt.sign(
        { id: user.id, id_account: user.id_account, id_branch: user.id_branch },
        process.env.secret,
        {
          expiresIn: exp // 12 hours
        }
      )

      res.status(200).send({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          id_account: user.id_account,
          id_branch: user.id_branch,
          cameras: user.cameras,
          analytics: user.analytics,
          accessToken: token
        }
      })
    })
    .catch(err => {
      res.status(500).send({ success: false, message: err.message })
    })
}

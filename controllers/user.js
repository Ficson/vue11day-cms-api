const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db')
const sqlHelper = require('../utilities/sqlhelper')

exports.list = async(req, res, next) => {
  try {
    const andConditionStr = sqlHelper.andCondition(req.query)
    const sqlStr = `SELECT * FROM users WHERE ${andConditionStr}`
    console.log(sqlStr)
    res.status(200).json(await db.query(sqlStr))
  } catch (err) {
    next(err)
  }
}

exports.create = async(req, res, next) => {
  try {
    const body = req.body
    const sqlStr =
      `INSERT INTO users(username, password, email, nickname, avatar, gender, create_time, modify_time)
      VALUES(
        '${body.email}',
        '${md5(md5(body.password))}',
        '${body.email}',
        '${body.nickname}',
        'default-avatar.png',
         0,
        '${moment().format('YYYY-MM-DD hh:mm:ss')}',
        '${moment().format('YYYY-MM-DD hh:mm:ss')}')`

    // 我们把容易出错的代码放到 try-catch 代码块中
    // try 中的代码一旦出错，会立即进入 catch 代码块
    const ret = await db.query(sqlStr)
    const [user] = await db.query(`SELECT * FROM users WHERE id='${ret.insertId}'`)
    res.status(201).json(user)
  } catch (err) {
    console.log(req.body)
    next(err)
  }
}

exports.update = (req, res, next) => {}

exports.destroy = (req, res, next) => {}

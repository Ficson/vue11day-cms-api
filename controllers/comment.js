const db = require('../models/db')
const moment = require('moment')

exports.list = async (req, res, next) => {
  try {
    const {topic_id} = req.query
    const sqlStr = `SELECT * FROM comments WHERE topic_id=${topic_id}`
    const comments = await db.query(sqlStr)
    res.status(200).json(comments)
  } catch (err) {
    neext(err)
  }
}

exports.create = async (req, res, next) => {
  console.log(Date.now())
  try {
    const {
      content = '',
      topic_id
    } = req.body

    const sqlStr = `
    INSERT INTO comments(content, create_time, modify_time, topic_id, user_id)
    VALUES('${content}',
      '${moment().format('YYYY-MM-DD hh:mm:ss')}',
      '${moment().format('YYYY-MM-DD hh:mm:ss')}',
      ${topic_id},
      ${req.session.user.id})`
      
      const { insertId } = await db.query(sqlStr)

      const [comment] = await db.query(`SELECT * FROM comments WHERE id=${insertId}`)
      res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
}

exports.update = (req, res, next) => {

}

exports.destroy = (req, res, next) => {

}
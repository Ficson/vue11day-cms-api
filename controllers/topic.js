const moment = require('moment')
const db = require('../models/db')

exports.list = async (req, res, next) => {
  try {
    let { _page = 1, _limit = 20 } = req.query

    if (_page < 1) {
      _page = 1
    }

    if (_limit < 1) {
      _limit = 1
    }

    if (_limit > 20) {
      _limit = 20
    }

    // 分页开始的页面
    const start = (_page - 1) * _limit

    const sqlStr = `
      SELECT * FROM topics LIMIT ${start}, ${_limit}`
    
    // 获取总记录数
    const [{count}] = await db.query(`SELECT COUNT(*) as count FROM topics`)

    const topics = await db.query(sqlStr)
    res.status(200).json({
      topics,
      count
    })
  } catch (err) {
    next(err)
  }

}

/**
 * 根据id查找一个
 */
exports.one = async(req, res, next) => {
  try {
    const { id } = req.params
    const sqlStr = `SELECT * FROM topics WHERE id=${id}`
    const topics = await db.query(sqlStr)
    res.status(200).json(topics[0])
  } catch (err) {
    next (err)
  }
}

exports.create = async (req, res, next) => {
  try {
    const body = req.body
    body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.modify_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.user_id = req.session.user.id

    const sqlStr = `
    INSERT INTO topics(title, content, user_id, create_time, modify_time)
    VALUES ('${body.title}', '${body.content}', '${body.user_id}','${body.create_time}', '${body.modify_time}')`

    const ret = await db.query(sqlStr)
    const [topic] = await db.query(`SELECT * FROM topics WHERE id=${ret.insertId}`)
    res.status(201).json(topic)

  } catch (err) {
    next(err)
  }

}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params
    const body = req.body
    const updateSqlStr = `
    UPDATE topics SET title = '${body.title}', content='${body.content}', modify_time='${moment().format('YYYY-MM-DD hh:mm:ss')}'
    WHERE id = ${id}`
  
    await db.query(updateSqlStr)
    const [updatedTopic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)
    res.status(201).json(updatedTopic)
  } catch (err){
    next(err)
  }

}

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params 
    await db.query(`DELETE FROM topics WHERE id=${id}`)
    res.status(201).json({})
  } catch (err) {
    next(err)
  }
}
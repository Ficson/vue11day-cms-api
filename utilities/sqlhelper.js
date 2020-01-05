exports.andCondition = (query) => {
  // {email: 'xxx', password: '123456'}
  // SELECT * FROM users WHERE 1=1
  // 1=1 and email='xxx' and password='xxx'
  let str = ' 1=1 '
  for (let key in query) {
    str += ` and ${key}='${query[key]}' `
  }
  return str
}

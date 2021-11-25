const jwt = require('jsonwebtoken')

const { promisify } = require('util')

// 转换成promise
exports.sign = promisify(jwt.sign)

exports.verify = promisify(jwt.verify)

// decode 不做验证，直接转换
exports.decode = promisify(jwt.decode)




// jwt 使用
// 同步
// const token = jwt.sign({foo: 'bar'}, 'dcdjvfvdfvgf')
// const dtata = jwt.verify(token, 'dcdjvfvdfvgf')

// 异步
// jwt.sign({foo:'bar'},'dcdjvfvdfvgf',(err, tokrn)=>{})
// jwt.verify(token, 'dcdjvfvdfvgf',(err, data)=>{})


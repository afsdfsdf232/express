const crypto = require('crypto') // node 原生模块
// 获取cryto 支持的散列算法
// console.log(crypto.getHashes())



module.exports = str => {
  return crypto.createHash('md5')
  .update('dshsjveruyruv'+str) // 需要加密的铭文
  .digest('hex') // 转换为十六进制
}

var mongoose = require('mongoose');
var url = 'mongodb://localhost/movieServer'
mongoose.connect(url, {useNewUrlParser: true},(err,res) => {
    if(!err) {
        console.log('连接数据库成功');
    }
});
//连接数据库
module.exports = mongoose;
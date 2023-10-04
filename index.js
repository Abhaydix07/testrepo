const express = require('express');
const app = express();
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
})

app.listen(3000);
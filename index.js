const express = require('express');
const Tesseract = require('tesseract.js');
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

let imageToRead = '';

app.post('/recognize', (req, res) => {
    imageToRead = req.body.image;
    if(validBase64Image(imageToRead)){
        recognize(imageToRead)
        .then((result) => {
            res.status(200).json(result.data.text)
        })
        .catch((err) => console.log(err))
    }
    else{
        res.status(400).json('error: A imagem não está em formato base64 válido.');
    }
})


const recognize = (image) =>{
    return Tesseract.recognize(
        image,
        'eng'
      )
}

app.listen(3000);

const validBase64Image = (base64Image) => {
    const regex = /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
    return base64Image && regex.test(base64Image);
}
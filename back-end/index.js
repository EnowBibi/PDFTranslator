/*const translate = require('@iamtraction/google-translate');
const port= 3000;
const express= require("express");
const app= express();



app.listen(port,
  console.log("listening on port 3000")
)
app.post("/login", async(req,res)=>{
  try{
    const {textToTranslate}=req.body
    translate("trying out this", { from: 'en', to: 'fr' }).then(res => {
      console.log(res.text); // OUTPUT: Je vous remercie
      console.log(res.from.autoCorrected); // OUTPUT: true
      console.log(res.from.text.value); // OUTPUT: [Thank] you
      console.log(res.from.text.didYouMean); // OUTPUT: false
    }).catch(err => {
      console.error(err);
    });
 }catch(error){
      console.log("translation failed")
      res.status(500).json({message:"translation failed"})
  }
})
*/
const translate = require('@iamtraction/google-translate');
const port = 3000;
const express = require("express");
const app = express();
app.use(express.json()); // Parse JSON request bodies

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/translate", async (req, res) => {
  try {
    const {textToTranslate} = req.body;
      console.log(textToTranslate);
    if (!textToTranslate) {
      return res.status(400).json({ message: 'Text to translate is required' });
    }

    const translationResult = await translate(textToTranslate, { from: 'en', to: 'fr' });

    res.json({
      translatedText: translationResult.text,
      originalText: translationResult.from.text.value,
      autoCorrection: translationResult.from.text.didYouMean,
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ message: 'Translation failed' });
  }
});
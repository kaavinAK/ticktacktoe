let express= require('express')
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/game',express.static('public'))
app.set('view engine','ejs')
let {User}=require('./models/schema')
let mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kaaivn:gak5679v@tutorial.1omiw.mongodb.net/platformgame?retryWrites=true&w=majority').then(()=>
{
  app.listen(5000,()=>
  {
      console.log("the server started");
  })
})

app.get('/',(req,res)=>
{
  
  return res.render('home.ejs')
})
app.post('/',async(req,res)=>
{
    let {username,email}=req.body
    let user=new User({
      username,email
    })
    let sata=await user.save()
    return res.redirect('/game/'+username)
})
app.get('/game/:name',(req,res)=>
{
  let {name}=req.params
return res.render('main.ejs',{name:name})
})
app.post('/score/:name',async(req,res)=>
{
  let {score,name}=req.body;
  let user = await User.findOne({username:name})
  user.score=score-1
  let data = await user.save()
  return res.json({status:'good'})
})
app.post('/scoreboard',(req,res)=>
{
  return res.redirect('/scoreboard')
})
app.get('/scoreboard',async (req,res)=>
{
  let data = await User.find()
  let title =['no','username','email','score']
  return res.render('scoreboard.ejs',{data:data,title:title})
})


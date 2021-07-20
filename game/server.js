let express=require('express')
let app = express()
let uuid=require('uuid')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
let server = require('http').createServer(app)
let io=require('socket.io')(server,{cors:{origin:'*'}})
app.use(express.static('public'))
app.get('/',(req,res)=>
{
let id=uuid.v4()
return res.render('home',{id:id})

})
app.post('/',(req,res)=>
{
    let {id}=req.body;
    return res.redirect(`/${id}`)
})
app.get('/:id',(req,res)=>
{
    let {id} = req.params
    return res.render('tictac',{id:id})
})
io.on('connection',(socket)=>
{
    console.log(socket.id)
    socket.on('joinroom',({id})=>
    {
        console.log("roomm id",id,"socket id",socket.id)
        socket.join(id)
    })
    socket.on('block selected',({id,blockid})=>
    {
        socket.to(id).emit('op block selected',{blockid:blockid})
    })
    socket.on('his turn',({id})=>
    {
        console.log("inside his turn ")
        socket.to(id).emit('your turn')
    })
    socket.on('you won',({id})=>
    {
        console.log("you won")
        socket.to(id).emit("you lost")
    })
    socket.on('disconnect',()=>
    {
        console.log("user disconnected")
    })
})

server.listen(5000,()=>
{
    console.log("server started tictactoe")
})
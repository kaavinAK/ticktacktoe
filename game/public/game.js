let videogrid=document.querySelector('.grid')
let blocks=[]
let status=document.querySelector('.status')
let turn = document.querySelector('.turn')
let socket=io()

let displayvideo=(video,stream)=>
{
video.srcObject=stream
video.addEventListener('loadedmetadata',()=>
{
    video.play()
})
videogrid.appendChild(video)
}
let myvideo = document.createElement('video')
myvideo.muted=true
window.navigator.mediaDevices.getUserMedia({
    audio:true,
    video:true
}).then((stream)=>
{
   displayvideo(myvideo,stream)

})
console.log(socket)
socket.on('your turn',()=>
{
    console.log("inside your turn ")
    turn.innerHTML='YOUR TURN'
    blocks.forEach((block)=>
    {
        block.addEventListener('click',click)
        block.myParam={block:block}
    })
})
socket.emit('joinroom',{id:id})

        let game=document.querySelector('.game')
        for(let i=0;i<9;i++)
        {
            let div=document.createElement('div')
            
            div.setAttribute('id',i)
            blocks.push(div)
            
            game.appendChild(div)
        }

        let click=(e)=>
        {
        e.preventDefault()
        let block = e.currentTarget.myParam.block
        console.log(block)
        console.log("inside click",block.classList)
        if(block.classList.value=='normal')
        {
            block.classList.remove('normal')
            block.classList.add('cross')
            socket.emit('block selected',{blockid:block.getAttribute('id'),id:id})
            blocks.forEach((block)=>
            {
                block.removeEventListener('click',click)
            })
            turn.innerHTML='OPPONENT TURN'
            socket.emit('his turn',{id:id})
        }
        }
        
blocks.forEach((block)=>
{
    block.classList.add('normal')
    console.log(block.classList)
    block.addEventListener('click',click)
    block.myParam={block:block}
})
socket.on('op block selected',({blockid})=>
{
     let opblock = blocks[blockid]
     opblock.classList.remove('normal')
     opblock.classList.add('circle')
})
socket.on("you lost",()=>
{
    status.innerHTML="YOU LOST"
    blocks.forEach((block)=>
            {
                block.removeEventListener('click',click)
            })
    clearInterval(time)
})
let check=()=>
{
    
    for(let i=0;i<blocks.length;i++)
    {
        
        if(i%3==0)
        {
            if(blocks[i].classList.value=='cross' && (blocks[i+1] && blocks[i+1].classList.value=='cross') &&(blocks[i+2] && blocks[i+2].classList.value=='cross'))
            {
                socket.emit('you won',{id:id})
                status.innerHTML="YOU WON"
                blocks.forEach((block)=>
            {
                block.removeEventListener('click',click)
            })
            clearInterval(time)
            
                break

            }
        }
        if(blocks[i].classList.value=='cross' && (blocks[i+3] && blocks[i+3].classList.value=='cross') && (blocks[i+6] && blocks[i+6].classList.value=='cross'))
        {
            socket.emit('you won',{id:id})
            status.innerHTML="YOU WON"
            blocks.forEach((block)=>
        {
            block.removeEventListener('click',click)
        })
        clearInterval(time)
        
            break
        }
        if((blocks[0].classList.value=='cross' && blocks[4].classList.value=='cross' && blocks[8].classList.value=='cross') || (blocks[2].classList.value=='cross' && blocks[4].classList.value=='cross' && blocks[6].classList.value=='cross'))
        {
           
            socket.emit('you won',{id:id})
            status.innerHTML="YOU WON"
            blocks.forEach((block)=>
        {
            block.removeEventListener('click',click)
        })
        clearInterval(time)
        
            break 
        }

    }
}

let time=setInterval(check,1500)

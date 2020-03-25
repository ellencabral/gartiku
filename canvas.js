window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas")
    const ctx = canvas.getContext("2d")
    const header = document.querySelector("#header")
    
    const pencilBtn = document.querySelector("#pencil")
    const eraserBtn = document.querySelector("#eraser")
    const eraseAllBtn = document.querySelector("#eraseAll")
    const palette = document.querySelector("#palette")

    //Resizing
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    //Variables
    let drawing = false
    let erasing = false
    
    
    let tool = 0
    let colors = [
        {
            name: 'Preto',
            code: '#000'
        },
        {
            name: 'Branco',
            code: '#FFF'
        },
        {
            name: 'Amarelo',
            code: '#FFE047'
        },
        {
            name: 'Azul',
            code: '#4038FF'
        },
        {
            name: 'Vermelho',
            code: '#FF5245'
        },
        {
            name: 'Verde',
            code: '#0fac50'
        }   
    ]
    let color = "#000"
    let colorButtons = []

    for(let value of colors) {
        const colorBtn = document.createElement("button")
        colorBtn.setAttribute('class', 'colorSquare')
        colorBtn.style.background = value.code
        palette.appendChild(colorBtn)

        colorButtons.push(colorBtn)

        colorBtn.addEventListener("click", function() {
            
            color = value.code
            for(let i = 0; i < colorButtons.length; i++) {
                if(colorButtons[i].style.width == "50px"){
                    colorButtons[i].style.width = "40px"
                    colorButtons[i].style.height = "40px"
                }
            }
            colorBtn.style.width = "50px"
            colorBtn.style.height = "50px"
        })
    }

    function startDrawing(e) {
        drawing = true
        draw(e)
    }

    function stopDrawing() {
        drawing = false
        ctx.beginPath()
    }

    function draw(e) {
        if(!drawing) return
        ctx.lineWidth = 5
        ctx.lineCap = "round"
        ctx.strokeStyle = color

        ctx.lineTo(e.clientX + 5, e.clientY - (header.offsetHeight - 25))
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(e.clientX + 5, e.clientY - (header.offsetHeight - 25))
    }    

    function startErasing(e) {
        erasing = true
        erase(e)
    }
    
    function stopErasing() {
        erasing = false
    }

    function erase(e) {
        if(!erasing) return
        ctx.clearRect(e.clientX - 3, e.clientY - (header.offsetHeight - 25), 20, 20)
    }

    pencilBtn.onclick = function() {
        tool = 1
        canvas.style.cursor = "url('./imagens/pencil.png'), auto"
    }

    eraserBtn.onclick = function() {
        tool = 2
        canvas.style.cursor = "url('./imagens/eraser.png'), auto"
    }    

    eraseAllBtn.onclick = function() {
        if(confirm("Apagar tudo?")) return ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    canvas.addEventListener("mousedown", function(e) {
        if(tool == 1) startDrawing(e)
        if(tool == 2) startErasing(e)
    })
    canvas.addEventListener("mouseup", function() {
        if(tool == 1) stopDrawing()
        if(tool == 2) stopErasing()
    })
    canvas.addEventListener("mousemove", function(e) {
        if(tool == 1) draw(e)
        if(tool == 2) erase(e)
    })
})
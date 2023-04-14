const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', e =>{
    e.preventDefault()
    if(e.code === 'Space'){
        setRandomColors()
    }
})

document.addEventListener('click', e =>{
    const type = e.target.dataset.type

    if(type === 'lock'){
        const node = e.target.tagName.toLowerCase() === 'i'
        ? e.target
        : e.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }else if(type === 'copy'){
        copyToClickboard(e.target.textContent)
    }
})

function genRandomColor() {
    const hexCodes = '0123456789ABCDEF'
    let color = ''

    for(let i=0; i < 6; i++){
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return ('#' + color)
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const lock = col.querySelector('button')
        const color = isInitial
        ? colors[index]
            ? colors[index]
            : chroma.random()
        : chroma.random()

        if(isLocked){
            colors.push(text.textContent)
            return
        }

        if(!isInitial){
            colors.push(color)
        }

        col.style.background = color
        text.textContent = color

        setTextColor(text, color)
        setTextColor(lock, color)
    })
    
    updateLocationHash (colors)
}

function setTextColor(text, color){
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
    
}

function copyToClickboard(text){
    navigator.clipboard.writeText(text)
}

function updateLocationHash (colors = []){
    document.location.hash = colors
    .map(col => {
        return col.toString().substring(1)
    })
    .join('-')
}

function getColorsFromHash (){
    if(document.location.hash.length > 1){
        return document.location.hash
        .substring(1)
        .split('-')
        .map(color => '#' + color)
    }
    return []
}

setRandomColors(true)


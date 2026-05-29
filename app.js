const API = 'dr-pepper-tracker-production.up.railway.app'

async function getDrinks() {
    const response = await fetch(`${API}/drinks`)
    const drinks = await response.json()
    console.log(drinks)  // add this line
    return drinks
}

async function logDrink() {
    await fetch(`${API}/drinks`, { method: 'POST' })
    
    const sprite = document.getElementById('rioluSprite')
    sprite.classList.add('shake')
    setTimeout(() => sprite.classList.remove('shake'), 500)
    
    loadPage()
}

async function deleteDrink(id) {
    await fetch(`${API}/drinks/${id}`, { method: 'DELETE' })
    loadPage()
}

async function loadPage() {
    const drinks = await getDrinks()

    const today = new Date().toDateString()
    const todayDrinks = drinks.filter(d => new Date(d.timestamp).toDateString() === today)

    document.getElementById('count').textContent = `Today: ${todayDrinks.length}`

    updateRiolu(todayDrinks.length)

    const list = document.getElementById('drinksList')
    list.innerHTML = drinks.map(d => `
        <li>
            ${new Date(d.timestamp).toLocaleString()}
            <button onclick="deleteDrink(${d.id})">delete</button>
        </li>
    `).join('')
}

function updateRiolu(todayCount) {
    const sprite = document.getElementById('rioluSprite')
    const mood = document.getElementById('mood')

    if (todayCount === 0) {
        sprite.src = 'riolu.gif'
        sprite.style.filter = 'brightness(1.0)'
        mood.textContent = 'Riolu is happy! 😄'
    } else if (todayCount <= 2) {
        sprite.src = 'riolu.gif'
        sprite.style.filter = 'brightness(0.7)'
        mood.textContent = 'Riolu is a little concerned... 😐'
    } else if (todayCount <= 3) {
        sprite.src = 'riolu.gif'
        sprite.style.filter = 'brightness(0.5)'
        mood.textContent = 'Riolu is sad 😢 please drink some water'
    } else if (todayCount <= 4) {
        sprite.src = 'riolu.gif'
        sprite.style.filter = 'brightness(0.3)'
        mood.textContent = 'Riolu is dying 💀 PUT THE DR PEPPER DOWN'
    } else if (todayCount <= 5) {
        sprite.src = 'tombstone.jpg'
        sprite.style.filter = 'brightness(1.0)'
        mood.textContent = 'Riolu is dead. What have you done..'
    }
}

document.getElementById('logBtn').onclick = logDrink

loadPage()
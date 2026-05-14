const form = document.getElementById('formLogin')

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch("http://localhost:3000/usuario", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, senha })
    })

    const data = await response.json();

    if (response.ok) {
      document.getElementById('resposta').innerText = 'Login realizado!';
      console.log(data)
    } else {
      document.getElementById('resposta').innerText = data.erro;
    }

  } catch (error) {
    console.error(error);
    document.getElementById('resposta').innerText = 'Erro no servidor'
  }
})

async function carregarUsuario() {
    try{
        const response = await fetch('http://localhost:3000/usuario')
        const usuario = await response.json()

        const lista = document.getElementById('listaUsuario')
        lista.innerHTML = '';

        usuario.forEach(user => {
            const li = document.createElement('li')
            li.textContent = `Email: ${user.email}`
            lista.appendChild(li)
        })
    } catch (error) {
        console.log("Erro ao carregar usuarios: ", error)
    }
}

carregarUsuario()
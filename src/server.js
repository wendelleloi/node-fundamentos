import http from 'node:http'
import { json } from './middlewares/json.js'

// HTTP METHODS
// GET, POST, PUT, PATCH, DELETE

// GET => buscar um recurso do back-end
// POST => criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// Cabeçalhos (requisição, resposta) => Metadados


// HTTP STATUS CODE
// 

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1, 
      name, 
      email   
    })

    return res
    .writeHead(201)
    .end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
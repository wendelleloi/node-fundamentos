import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// HTTP METHODS
// GET, POST, PUT, PATCH, DELETE

// GET => buscar um recurso do back-end
// POST => criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// Cabeçalhos (requisição, resposta) => Metadados


// Enviar informação
// 
// Query Parameters: URL Stateful => Filtros, paginação (não obrigatórios)
// EX: https://localhost:3333/users?userId=1&name=wendell

// Route Parameters => Geralmente identificação de recurso
// EX: https://localhost:3333/users/1

// Request Body => Envio de informação de formulário

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})  

server.listen(3333)
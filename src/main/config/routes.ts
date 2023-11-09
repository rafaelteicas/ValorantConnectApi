import { type Express, Router } from 'express'
import fs from 'fs/promises'
import path from 'path'

const routeFile = path.join(process.cwd(), 'src', 'main', 'routes')

export async function routerGenerator (app: Express): Promise<void> {
  const router = Router()
  try {
    const files = await fs.readdir(routeFile)

    for (const file of files) {
      const moduleRoute = await import(path.join(routeFile, file))
      moduleRoute.default(router)
    }
    app.use('/', router)
  } catch (err) {
    console.error('Erro ao carregar rotas:', err)
  }
}

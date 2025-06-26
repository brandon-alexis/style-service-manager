import { app } from '../app'
import { port } from '../load-environment'

const run = () => {
  console.log(`Server running on port ${port}`)
  console.log(`Open on browser http://localhost:${port}`)
}

app.listen(port, run)

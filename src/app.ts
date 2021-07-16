import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import { connect } from 'mongoose'
import morgan from 'morgan'
import { dbConnection } from './database/index'
import { requestLoggerMiddleware } from './middlewares/reqLogging.middleware'
import Routes from './routes'
import { stream } from './utils/logger'

dotenv.config()

const app: Application = express()

export const baseUrl = '/garage/v1.0'

// Middlewares
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())
app.use(cors())
app.use(morgan('dev', { stream }))
app.use(requestLoggerMiddleware)

app.get('/', (req, res) => {
  res.send('API Working')
})

app.use(Routes())

connect(dbConnection.url, dbConnection.options)
  .then(() => {
    console.log('🟢 The database is connected.')
  })
  .catch(error => {
    console.log(`🔴 Unable to connect to the database: ${error}.`)
  })

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`::::Server Running at port ${PORT}`))

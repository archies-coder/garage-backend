import cors from 'cors'
import express, { Application } from 'express'
import { connect } from 'mongoose'
import { dbConnection } from './database/index'
import VehicleRoutes from './routes/vehicle.routes'
import VehicleEntryRoutes from './routes/vehicleEntry.routes'
import BillRoutes from './routes/bill.routes'
import AuthRoutes from './routes/auth.routes'
import { stream } from './utils/logger'
import morgan from 'morgan'
import * as dotenv from 'dotenv'

dotenv.config()

const app: Application = express()

export const baseUrl = '/garage/v1.0'

app.get('/', (req, res) => {
  res.send('Hello')
})

// Middlewares
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())
app.use(cors())
app.use(morgan('dev', { stream }))

app.use(AuthRoutes)
app.use(VehicleRoutes)
app.use(VehicleEntryRoutes)
app.use(BillRoutes)

connect(dbConnection.url, dbConnection.options)
  .then(() => {
    console.log('🟢 The database is connected.')
  })
  .catch(error => {
    console.log(`🔴 Unable to connect to the database: ${error}.`)
  })

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080

app.listen(PORT, () => console.log(`::::Server Running at port ${PORT}`))

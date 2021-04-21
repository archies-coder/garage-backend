import cors from 'cors'
import express, { Application } from 'express'
import { connect } from 'mongoose'
import { dbConnection } from './database/index'
import VehicleRoutes from './routes/vehicle.routes'
import VehicleEntryRoutes from './routes/vehicleEntry.routes'
import AuthRoutes from './routes/auth.routes'
import { stream } from './utils/logger.js'
import morgan from 'morgan'

const app: Application = express()

export const baseUrl = '/garage/v1.0'

// Middlewares
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())
app.use(morgan('dev', { stream }))
app.use(cors())

app.use(VehicleRoutes)
app.use(VehicleEntryRoutes)
app.use(AuthRoutes)

connect(dbConnection.url, dbConnection.options)
  .then(() => {
    console.log('🟢 The database is connected.')
  })
  .catch(error => {
    console.log(`🔴 Unable to connect to the database: ${error}.`)
  })

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`::::Server Running at port ${PORT}`))

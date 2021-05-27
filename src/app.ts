import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import { connect } from 'mongoose'
import morgan from 'morgan'
import { vehicleImageBucket } from './database/firebase'
import { dbConnection } from './database/index'
import { requestLoggerMiddleware } from './middlewares/reqLogging.middleware'
import AuthRoutes from './routes/auth.routes'
import BillRoutes from './routes/bill.routes'
import CustomerRoutes from './routes/customer.routes'
import SparePartRoutes from './routes/sparePart.routes'
import StatsData from './routes/stats.routes'
import VehicleRoutes from './routes/vehicle.routes'
import VehicleEntryRoutes from './routes/vehicleEntry.routes'
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

app.use(AuthRoutes)
app.use(VehicleRoutes)
app.use(VehicleEntryRoutes)
app.use(BillRoutes)
app.use(SparePartRoutes)
app.use(StatsData)
app.use(CustomerRoutes)

connect(dbConnection.url, dbConnection.options)
  .then(() => {
    console.log('🟢 The database is connected.')
  })
  .catch(error => {
    console.log(`🔴 Unable to connect to the database: ${error}.`)
  })

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`::::Server Running at port ${PORT}`))

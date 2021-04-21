import { dbConnection } from './database/index'
import express, { Application } from 'express'
import { connect } from 'mongoose'
import VehicleRoutes from './routes/vehicle.routes'
import VehicleEntryRoutes from './routes/vehicleEntry.routes'

const app: Application = express()

app.use(VehicleRoutes)
app.use(VehicleEntryRoutes)

connect(dbConnection.url, dbConnection.options)
  .then(() => {
    console.log('🟢 The database is connected.')
  })
  .catch(error => {
    console.log(`🔴 Unable to connect to the database: ${error}.`)
  })

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`::::Server Running at port ${PORT}`))

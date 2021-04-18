import mongoose = require('mongoose')
const { model, Schema } = mongoose

const visitorSchema = new Schema({
  vehicleImagePath: {
    type: String,
  },
  customerName: {
    type: String,
  },
  customerMobile: {
    type: String,
  },
  purpose: {
    type: String,
  },
  remark: {
    type: String,
  },
  visitorCount: {
    type: String,
  },
  vehicleNo: {
    type: String,
  },
  vehicleModel: {
    type: String,
  },
  vehicleType: {
    type: String,
  },
  checkOutBy: {
    type: String,
  },
  intime: {
    type: String,
  },
  outime: {
    type: String,
  },
})

const visitorModel = model('Visitor', visitorSchema)

module.exports = visitorModel

import { ISparePartDTO } from '../dtos/sparePart.dtos'
import SparePartModel from '../models/sparePart.model'

const fetchAll = async () => {
  return await SparePartModel.find()
}

const createNewSparePart = async (sparePart: ISparePartDTO) => {
  const data = await SparePartModel.find()
  let value = true
  let add = 0
  let quant = 0
  data.map(item => {
    if (item.name === sparePart.name && item.brand === sparePart.brand) {
      value = false
      add = item.quantity
    }
  })
  if (value) return SparePartModel.create(sparePart)
  else {
    if (typeof sparePart.quantity === 'string') {
      quant = parseInt(sparePart.quantity)
    } else quant = sparePart.quantity
    const filter = { name: sparePart.name }
    const update = { quantity: add + quant }
    return SparePartModel.findOneAndUpdate(filter, update, { new: true })
  }
}

export { fetchAll, createNewSparePart }

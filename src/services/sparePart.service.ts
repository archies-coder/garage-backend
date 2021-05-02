import { ISparePartDTO } from '../dtos/sparePart.dtos'
import SparePartModel from '../models/sparePart.model'

const fetchAll = async () => {
  return await SparePartModel.find()
}

const createNewSparePart = async (sparePart: ISparePartDTO) => {
  const data = await SparePartModel.find()
  let value = true
  let add = 0
  data.map(item => {
    if (item.name === sparePart.name && item.category === sparePart.category) {
      value = false
      add = item.quantity
    }
  })
  if (value) return SparePartModel.create(sparePart)
  else {
    const filter = { name: sparePart.name }
    const update = { quantity: add + sparePart.quantity }
    return SparePartModel.findOneAndUpdate(filter, update, { new: true })
  }
}

export { fetchAll, createNewSparePart }

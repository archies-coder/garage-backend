import { ISparePartDTO } from '../dtos/sparePart.dtos'
import SparePartModel from '../models/sparePart.model'

const fetchAll = () => SparePartModel.find()

const createOrUpdateSparePart = async (sparePart: ISparePartDTO) => {
  const spareParts = await SparePartModel.find()
  const existing = spareParts.find(
    item => item.name === sparePart.name && item.brand === sparePart.brand,
  )
  if (!existing) {
    return SparePartModel.create(sparePart)
  } else {
    const filter = { name: sparePart.name }
    const update = { quantity: existing.quantity + Number(sparePart.quantity) }
    return SparePartModel.findOneAndUpdate(filter, update, { new: true })
  }
}

export { fetchAll, createOrUpdateSparePart }

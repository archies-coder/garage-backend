import { ISparePartDTO } from '../dtos/sparePart.dtos'
import SparePartModel from '../models/sparePart.model'

const fetchAll = async () => {
  return await SparePartModel.find()
}

const createNewSparePart = async (sparePart: ISparePartDTO) => {
  return await SparePartModel.create(sparePart)
}

export { fetchAll, createNewSparePart }

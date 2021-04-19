import vehicleEntryModel from '../models/vehicleEntry.model'

export default class VehicleEntryService {
  private vehicleEntryModel = vehicleEntryModel

  public getEntry() {
    return this.vehicleEntryModel.find()
  }
}

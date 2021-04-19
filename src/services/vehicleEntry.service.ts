import vehicleEntryModel from '../models/vehicleEntry.model'

export default class VehicleEntryService {
  private vehicleEntryModel = new vehicleEntryModel()

  public getEntry() {
    return this.vehicleEntryModel.find()
  }
}

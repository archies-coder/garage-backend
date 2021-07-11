export interface IBillEntry {
  name: string
  cost: number
}

export interface INewBillDTO {
  vehicleEntryId: string
  items: IBillEntry[]
}

export interface ICreateNewBill extends IBillEntry {
  vehicleEntryId: string
}

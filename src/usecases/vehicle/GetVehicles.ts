import { VehicleRepository } from "../../repositories/VehicleRepository";

export class GetVehicles {
  private vehicleRepository: VehicleRepository;

  constructor(vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute() {
    return await this.vehicleRepository.findAll();
  }
}

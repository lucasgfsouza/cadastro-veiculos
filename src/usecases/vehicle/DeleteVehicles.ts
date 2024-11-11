import { VehicleRepository } from "../../repositories/VehicleRepository";

export class DeleteVehicle {
  private vehicleRepository: VehicleRepository;

  constructor(vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(id: string) {
    return await this.vehicleRepository.delete(id);
  }
}

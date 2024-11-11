import { VehicleRepository } from "../../repositories/VehicleRepository";

export class GetVehicleById {
  private vehicleRepository: VehicleRepository;

  constructor(vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(id: string) {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) {
      throw new Error("Veículo não encontrado");
    }
    return vehicle;
  }
}

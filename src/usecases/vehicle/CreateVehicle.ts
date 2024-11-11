import { VehicleRepository } from "../../repositories/VehicleRepository";
import { CreateVehicleDTO } from "../../dtos/CreateVehicleDTO";
import { validatePlate } from "../../utils/validatePlate";

export class CreateVehicle {
  private vehicleRepository: VehicleRepository;

  constructor(vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(data: CreateVehicleDTO) {
    const vehicleData = new CreateVehicleDTO(data);
    const { placa, ano } = vehicleData;

    if (!validatePlate(placa, ano)) {
      throw new Error(
        "Placa inválida para o ano de fabricação informado. A placa deve seguir o padrão ABC-1234 ou ABC1D23"
      );
    }

    return await this.vehicleRepository.create(vehicleData);
  }
}

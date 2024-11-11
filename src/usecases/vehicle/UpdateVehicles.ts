import { VehicleRepository } from "../../repositories/VehicleRepository";
import { UpdateVehicleDTO } from "../../dtos/UpdateVehicleDTO";
import { validatePlate } from "../../utils/validatePlate";

export class UpdateVehicle {
  private vehicleRepository: VehicleRepository;

  constructor(vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(id: string, data: UpdateVehicleDTO) {
    const { placa, ano } = data;

    if (placa && !ano) {
      throw new Error("Para atualizar a placa é necessário informar o ano");
    }

    if (placa && ano && !validatePlate(placa, ano)) {
      throw new Error(
        "Placa inválida para o ano de fabricação informado. A placa deve seguir o padrão ABC-1234 ou ABC1D23"
      );
    }

    return await this.vehicleRepository.update(id, data);
  }
}

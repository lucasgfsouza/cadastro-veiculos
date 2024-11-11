// src/dtos/CreateVehicleDTO.ts

export class CreateVehicleDTO {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;

  constructor(data: Partial<CreateVehicleDTO>) {
    const missingFields = [];

    if (!data.placa) missingFields.push("placa");
    if (!data.chassi) missingFields.push("chassi");
    if (!data.renavam) missingFields.push("renavam");
    if (!data.modelo) missingFields.push("modelo");
    if (!data.marca) missingFields.push("marca");
    if (!data.ano) missingFields.push("ano");

    if (missingFields.length > 0) {
      throw new Error(
        `Os seguintes campos são obrigatórios: ${missingFields.join(", ")}`
      );
    }

    this.placa = data.placa ?? "";
    this.chassi = data.chassi ?? "";
    this.renavam = data.renavam ?? "";
    this.modelo = data.modelo ?? "";
    this.marca = data.marca ?? "";
    this.ano = data.ano ?? 0;
  }
}

import { expect } from "chai";
import sinon from "sinon";
import { CreateVehicle } from "../src/usecases/vehicle/CreateVehicle";
import { GetVehicles } from "../src/usecases/vehicle/GetVehicles";
import { GetVehicleById } from "../src/usecases/vehicle/GetVehicleById";
import { UpdateVehicle } from "../src/usecases/vehicle/UpdateVehicles";
import { DeleteVehicle } from "../src/usecases/vehicle/DeleteVehicles";
import { VehicleRepository } from "../src/repositories/VehicleRepository";

describe("Vehicle Use Cases", () => {
  let vehicleRepository: sinon.SinonStubbedInstance<VehicleRepository>;

  beforeEach(() => {
    vehicleRepository = sinon.createStubInstance(VehicleRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("CreateVehicle", () => {
    it("deve criar um veículo com sucesso", async () => {
      const data = {
        placa: "ABC1D23",
        chassi: "123456",
        renavam: "654321",
        modelo: "Carro",
        marca: "Marca",
        ano: 2022,
      };

      vehicleRepository.create.resolves({ ...data, id: "1" });

      const createVehicle = new CreateVehicle(vehicleRepository as any);
      const result = await createVehicle.execute(data);
      expect(result).to.deep.equal({ ...data, id: "1" });
      expect(vehicleRepository.create.calledOnce).to.be.true;
    });

    it("deve lançar erro ao criar um veículo com dados incompletos", async () => {
      const data = { placa: "ABC1D23" };

      const createVehicle = new CreateVehicle(vehicleRepository as any);
      try {
        await createVehicle.execute(data as any);
        throw new Error("Erro esperado ao criar veículo com dados incompletos");
      } catch (error: any) {
        expect(error.message).to.include(
          "Os seguintes campos são obrigatórios"
        );
      }
    });
  });

  describe("GetVehicles", () => {
    it("deve retornar todos os veículos com sucesso", async () => {
      const vehicles = [
        { id: "1", placa: "ABC1D23" },
        { id: "2", placa: "XYZ2E45" },
      ];

      vehicleRepository.findAll.resolves(vehicles);

      const getVehicles = new GetVehicles(vehicleRepository as any);
      const result = await getVehicles.execute();
      expect(result).to.deep.equal(vehicles);
      expect(vehicleRepository.findAll.calledOnce).to.be.true;
    });

    it("deve retornar uma lista vazia se não houver veículos", async () => {
      vehicleRepository.findAll.resolves([]);

      const getVehicles = new GetVehicles(vehicleRepository as any);
      const result = await getVehicles.execute();
      expect(result).to.deep.equal([]);
    });
  });

  describe("GetVehicleById", () => {
    it("deve retornar um veículo pelo ID", async () => {
      const vehicle = { id: "1", placa: "ABC1D23" };

      vehicleRepository.findById.resolves(vehicle);

      const getVehicleById = new GetVehicleById(vehicleRepository as any);
      const result = await getVehicleById.execute("1");
      expect(result).to.deep.equal(vehicle);
      expect(vehicleRepository.findById.calledOnceWith("1")).to.be.true;
    });

    it("deve lançar erro se o veículo não for encontrado", async () => {
      vehicleRepository.findById.resolves(null);

      const getVehicleById = new GetVehicleById(vehicleRepository as any);
      try {
        await getVehicleById.execute("999");
        throw new Error("Erro esperado ao não encontrar o veículo");
      } catch (error: any) {
        expect(error.message).to.equal("Veículo não encontrado");
      }
    });
  });

  describe("UpdateVehicle", () => {
    it("deve atualizar um veículo com sucesso", async () => {
      const data = { placa: "XYZ2E45", ano: 2022 };

      vehicleRepository.update.resolves({ ...data, id: "1" });

      const updateVehicle = new UpdateVehicle(vehicleRepository as any);
      const result = await updateVehicle.execute("1", data);
      expect(result).to.deep.equal({ ...data, id: "1" });
      expect(vehicleRepository.update.calledOnceWith("1", data)).to.be.true;
    });

    it("deve lançar erro se o veículo não for encontrado para atualização", async () => {
      vehicleRepository.update.rejects(new Error("Veículo não encontrado"));

      const updateVehicle = new UpdateVehicle(vehicleRepository as any);
      try {
        await updateVehicle.execute("999", { placa: "XYZ2E45", ano: 2022 });
        throw new Error("Erro esperado ao não encontrar o veículo");
      } catch (error: any) {
        expect(error.message).to.equal("Veículo não encontrado");
      }
    });
  });

  describe("DeleteVehicle", () => {
    it("deve deletar um veículo com sucesso", async () => {
      vehicleRepository.delete.resolves();

      const deleteVehicle = new DeleteVehicle(vehicleRepository as any);
      await deleteVehicle.execute("1");
      expect(vehicleRepository.delete.calledOnceWith("1")).to.be.true;
    });

    it("deve lançar erro se o veículo não for encontrado para deletar", async () => {
      vehicleRepository.delete.rejects(new Error("Veículo não encontrado"));

      const deleteVehicle = new DeleteVehicle(vehicleRepository as any);
      try {
        await deleteVehicle.execute("999");
        throw new Error(
          "Erro esperado ao não encontrar o veículo para deletar"
        );
      } catch (error: any) {
        expect(error.message).to.equal("Veículo não encontrado");
      }
    });
  });
});

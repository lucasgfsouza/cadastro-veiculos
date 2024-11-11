import { VehicleRepository } from "./repositories/VehicleRepository";
import { CreateVehicle } from "./usecases/vehicle/CreateVehicle";
import { GetVehicles } from "./usecases/vehicle/GetVehicles";
import { GetVehicleById } from "./usecases/vehicle/GetVehicleById";
import { UpdateVehicle } from "./usecases/vehicle/UpdateVehicles";
import { DeleteVehicle } from "./usecases/vehicle/DeleteVehicles";
import { VehicleController } from "./controllers/VehicleController";

const vehicleRepository = new VehicleRepository();

const createVehicle = new CreateVehicle(vehicleRepository);
const getVehicles = new GetVehicles(vehicleRepository);
const getVehicleById = new GetVehicleById(vehicleRepository);
const updateVehicle = new UpdateVehicle(vehicleRepository);
const deleteVehicle = new DeleteVehicle(vehicleRepository);

const vehicleController = new VehicleController(
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
);

export { vehicleController };

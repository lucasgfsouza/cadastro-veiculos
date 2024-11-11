import { pool } from "../bootstrap/index";

export class VehicleRepository {
  async create(vehicle: any) {
    const { placa, chassi, renavam, modelo, marca, ano } = vehicle;
    const result = await pool.query(
      "INSERT INTO vehicles (placa, chassi, renavam, modelo, marca, ano) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [placa, chassi, renavam, modelo, marca, ano]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM vehicles");
    return result.rows;
  }

  async findById(id: string) {
    const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  async update(id: string, vehicle: any) {
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(vehicle)) {
      if (value !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fields.length === 0) {
      throw new Error("Nenhum campo para atualizar");
    }

    const query = `UPDATE vehicles SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id: string) {
    await pool.query("DELETE FROM vehicles WHERE id = $1", [id]);
  }
}

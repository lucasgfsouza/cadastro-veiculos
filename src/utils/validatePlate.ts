/**
 * Valida o formato da placa de um veículo com base no ano de fabricação.
 * Novo padrão (Mercosul): ABC1D23
 * Antigo padrão (Brasil): ABC-1234
 *
 * @param plate - Placa do veículo a ser validada.
 * @param year - Ano de fabricação do veículo.
 * @returns `true` se a placa for válida, caso contrário `false`.
 */
export const validatePlate = (plate: string, year: number): boolean => {
  const oldPattern = /^[A-Z]{3}-\d{4}$/;
  const newPattern = /^[A-Z]{3}\d[A-Z]\d{2}$/;

  if (year >= 2022) {
    return newPattern.test(plate);
  } else {
    return oldPattern.test(plate) || newPattern.test(plate);
  }
};

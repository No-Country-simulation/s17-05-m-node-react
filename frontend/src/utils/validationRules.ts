import { ValidationRuleI } from "@/types/generalTypes";

export const findInputErrors = (validationRules: ValidationRuleI[]) => {
    return validationRules.filter((validationRule) => validationRule.condition);
};

export const getFieldFormRules = (
    latitude: string,
    longitude: string,
    size: string,
    workersAmount: string
) => {
    return [
        {
            field: "latitude",
            condition:
                !/^-?\d{1,2}\.\d{1,8}$/.test(latitude) ||
                Number(latitude) < -90 ||
                Number(latitude) > 90,
            message:
                "La latitud debe ser un decimal (10, 8) y estar dentro del rango -90 a 90.",
        },
        {
            field: "longitude",
            condition:
                !/^-?\d{1,3}\.\d{1,8}$/.test(longitude) ||
                Number(longitude) < -180 ||
                Number(longitude) > 180,
            message:
                "La longitud debe ser un decimal (11, 8) y estar dentro del rango -180 a 180.",
        },
        {
            field: "size",
            condition: !/^\d+$/.test(size) || Number(size) <= 0,
            message: "El tamaño debe ser un número entero positivo.",
        },
        {
            field: "workersAmount",
            condition: !/^\d+$/.test(workersAmount) || Number(workersAmount) <= 0,
            message:
                "La cantidad de trabajadores debe ser un número entero positivo.",
        },
    ];
};
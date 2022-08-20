export const toFloat = (value) => (value ? parseFloat(value.toFixed(3)) : 0);

export const toPercent = (value) => toFloat(toFloat(value) * 100);

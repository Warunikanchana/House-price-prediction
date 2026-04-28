export const currencyFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
  maximumFractionDigits: 0,
});

export function estimatePrice({ district, bedrooms, bathrooms, houseSize, landSize, houseAge }) {
  const districtMultiplier = {
    Colombo: 24000,
    Kandy: 18000,
    Gampaha: 15000,
    Kurunegala: 12000,
    Matara: 14000,
  };

  const baseRate = districtMultiplier[district] ?? 13500;
  const sizeValue = Number(houseSize) * baseRate;
  const landValue = Number(landSize) * 2100;
  const roomValue = Number(bedrooms) * 950000 + Number(bathrooms) * 650000;
  const agePenalty = Number(houseAge) * 160000;

  return Math.max(8500000, Math.round(sizeValue + landValue + roomValue - agePenalty));
}

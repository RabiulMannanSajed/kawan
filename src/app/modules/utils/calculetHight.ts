export const calculateHight = async (hight: string): Promise<string> => {
  const hightValue = hight.trim(); // Clean up whitespace
  let feet = 0;
  let inches = 0;

  if (hightValue.includes('.')) {
    [feet, inches = 0] = hightValue
      .split('.')
      .map((val) => parseFloat(val.trim()) || 0);
  } else {
    feet = parseFloat(hightValue) || 0;
  }

  const m = feet * 0.3048 + inches * 0.0254; // Conversion logic in m
  hight = `${m.toFixed(2)} `;
  return hight;
};

const GetQuantityByCate = (areaSchedule) => {
  const typesQuantity = {
    Glass: 0,
    Plastic: 0,
    Paper: 0,
    Organic: 0,
    Metal: 0
  };

  areaSchedule.forEach(schedule => {
    schedule.WasteType.forEach(waste => {
      if (typesQuantity.hasOwnProperty(waste.wastetype)) {
        typesQuantity[waste.wastetype] += waste.quantity;
      }
    });
  });

  return typesQuantity;
};
export default GetQuantityByCate;
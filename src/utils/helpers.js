export const calculateTotal = (products) => {
  let total = products.reduce((acc, item) => {
    return (acc += item.subTotal);
  }, 0);
  return total;
};

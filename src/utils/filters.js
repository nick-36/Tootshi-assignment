export const filterBySize = (arr, size) => {
  if (size) {
    const { value } = size;
    return arr.filter((item) => {
      return item.size === value;
    });
  } else {
    return arr;
  }
};

export const filterByCategory = (arr, cat) => {
  if (cat) {
    const { value } = cat;
    return arr.filter((item) => {
      return item.category === value;
    });
  } else {
    return arr;
  }
};

export const filterBySearch = (arr, query) => {
  const keys = ["name", "color", "category"];
  if (query) {
    return arr.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    );
  } else {
    return arr;
  }
};

export const getIdItem = (arr, id) => {
    return arr.findIndex((item) => item.id === id);
  };
  
  
  export const getIdCategorie = (category) => {
    return !category ? 11 : category;
  };
  export const filtered = (arr, value) => {
    const category = getIdCategorie(value);
  
    const result =
      !value || value === 11
        ? arr
        : arr.filter((item) => item.category === category);
  
    return result;
  };
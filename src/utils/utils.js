export const formatMaterialQuantity = (data) => {
          if (typeof data !== 'number' || isNaN(data)) {
                    return 'NaN';
          }
          return data == -1 ? "NOT EXIST" : data;
}

export const formatCurrency = (num) => {
          if (typeof num !== 'number' || isNaN(num)) {
                    return 'NaN';
          }
          console.log(num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

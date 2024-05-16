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
          //console.log(num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const getColor = (status) => {
          switch (status) {
                    case 'ACTIVE':
                              return 'text-[#3DBC59]'
                    case 'INACTIVE':
                              return 'text-[#B13028]'
                    case 'INORDER':
                              return 'text-[#2374DB]'
                    default:
                              return 'text-black'
                  }
          }

export const getRequestHeaderWithBearerToken = (token) => {
        let result = {
                headers: {
                        'Authorization' : 'Bearer ' + token
                }
        }
        return result;
}

export function convertISOToDate(isoDateString) {
        const date = new Date(isoDateString);
    
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    }

    export function convertISOToDateTime(isoDateString) {
        const date = new Date(isoDateString);
    
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
    
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
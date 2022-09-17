
module.exports = {
  Error: function(error) {
     return new Promise((resolve,reject) => {
      
        if(!!error) {
          reject(error);
        }else{
          resolve(rows);
        }

    })
  }
}
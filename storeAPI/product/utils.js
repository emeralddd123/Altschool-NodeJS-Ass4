const generateSKU = (name) => {
    const firstThreeLetters = name.slice(0, 3).toUpperCase();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
  
    return `${firstThreeLetters}${randomNumber}`;
  }


module.exports = { generateSKU }

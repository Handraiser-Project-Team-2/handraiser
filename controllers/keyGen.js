module.exports = {
  genKey: (item) => {
    console.log(item)

    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    
    console.log(randomstring);

     randomstring = randomstring.concat("-K-MT")

    return randomstring;
  }
};

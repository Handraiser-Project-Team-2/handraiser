module.exports = {
  genKey: (item, type) => {

    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    
    console.log(randomstring);

    if(type === "mentor")
      randomstring = randomstring.concat("-K-MT");
    if(type === "admin")
      randomstring = randomstring.concat("-K-AD");
    if(type === "classroom")
      randomstring = randomstring.concat("-K-CL")

    return randomstring;
  }
};

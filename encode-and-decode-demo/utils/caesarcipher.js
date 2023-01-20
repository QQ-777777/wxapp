function CaesarCipher(message,offset){
  this.message = message
  this.offset = offset
  // a-z的词频
  this.frequency = [
    0.08167,
    0.01492,
    0.02782,
    0.04253,
    0.130001,
    0.02228,
    0.02015,
    0.06094,
    0.06966,
    0.00153,
    0.00772,
    0.04025,
    0.02406,
    0.06749,
    0.07507,
    0.01929,
    0.00095,
    0.05987,
    0.06327,
    0.09056,
    0.02758,
    0.00978,
    0.02360,
    0.00150,
    0.01974,
    0.00074
  ]
  // pre加密
  this.cipher = function(){
    var str1 = []
    var str = this.message
    for(var i=0;i<str.length;i++){
      var num = str[i].charCodeAt()
      //大写字母
      if(num>=65 && num<=90){
        var cipher_value = num + this.offset - 65
        if(cipher_value>25){
          cipher_value = cipher_value % 26
        }
        else if(cipher_value<0){
          cipher_value = cipher_value + 26
        }
        cipher_value = cipher_value + 65
        str1.push(String.fromCharCode(cipher_value))
      }
      //小写字母
      else if(num>=97 && num<=122){
        var cipher_value = num + this.offset - 97
        if(cipher_value>25){
          cipher_value = cipher_value % 26
        }
        else if(cipher_value<0){
          cipher_value = cipher_value + 26
        }
        cipher_value = cipher_value + 97
        str1.push(String.fromCharCode(cipher_value))
      }
      else{
        str1.push(str[i])
      }
    }
    this.message = str1.join("")
    return this.message
  }
  this.calculate_entropy = function(entropy_string){
    var total = 0
    for(var i=0;i<entropy_string.length;i++){
      var num = entropy_string[i].charCodeAt()
      // 判断是否是字母
      if(num<=90 && num>=65 || num<=122 && num>=97){
        if(num<=90 && num>=65){
          num = num - 65 + 97//大写转小写
        }
        num = num - 97
        var prob = this.frequency[num]
      }
      else{
        continue
      }
      total = total - Math.log(prob) / Math.log(2)
    }
    return total
  }
  this.cracked = function(){
    var entropy_values = []
    var message = this.message
    for(var i=0;i<26;i++){
      this.message = message
      this.offset = i * -1
      var test_cipher = this.cipher()
      entropy_values.push(this.calculate_entropy(test_cipher))
    }
    var min = entropy_values[0]
    var flag = 0
    for(var i=1;i<26;i++){
      if(min>entropy_values[i]){
        min = entropy_values[i]
        flag = i
      }
    }
    this.offset = flag * -1
    this.message = message
    this.message = this.cipher()
    return this.message
  }
  // 加密
  this.encoded = function(){
    return this.cipher()
  }
  // 解密
  this.decoded = function(){
    this.offset = this.offset *(-1)
    return this.cipher()
  }
}
module.exports = {
  CaesarCipher: CaesarCipher
}
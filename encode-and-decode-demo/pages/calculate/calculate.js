//calculate.js
//获取应用实例
var fun_md5 = require('../../utils/md5.js')
var fun_sha1 = require('../../utils/sha1.js')
// var fun_base64 = require('../../utils/base64.js')
var fun_aes = require('../../utils/aes.js')
var fun_caesar = require('../../utils/caesarcipher.js')
var sMD5 = require('../../utils/spark-md5.js')
var app = getApp()
//十六位十六进制数作为秘钥
var result = '1234567890abcdef'//秘钥
var key = fun_aes.CryptoJS.enc.Utf8.parse(result);  

//十六位十六进制数作为秘钥偏移量
var iv = fun_aes.CryptoJS.enc.Utf8.parse('1234567890123456');
//输入密文
var inputValue = ''

Page({
  data: {
    show_caesar_encode: '',
    show_caesar_decode: '',
    show_caesar_key: '',
    show_md5: '',
    show_filemd5: '',
    show_sha1: '',
    Key: '1234567890abcdef',
    // show_base64_encode: '',
    // show_base64_decode: '',
    show_aes_encode: '',
    show_aes_decode: '',

    bTextHintDlgShow	: false,
		arrPasswordHintList		: [
      "I am a student from Shanghai University",
      "A great ship asks for deep waters",
      "You are the sunshine in my life",
      "Rome is not built in one day",
      "Misfortunes never come alone",
      "Constant dropping wears the stone",
			"I like apples because apples are good for our health",
			"There are moments in life when you miss someone so much that you just want to pick them from your dreams and hug them for real"
		],
  },
  main: function () {
    //caesar加密
    var caesar_key = Math.ceil((Math.random()*2-1)*10)
    var str_caesar_key = ''
    if(caesar_key<0){
      var str_caesar_key = '左移' + (-1*caesar_key).toString() + '位'
    }else if(caesar_key>0){
      str_caesar_key = '右移' + caesar_key.toString() + '位'
    }else{
      str_caesar_key = '不移位'
    }
    var s = new fun_caesar.CaesarCipher(inputValue, caesar_key)
    var str_caesar_encode = s.encoded()
    var str_caesar_decode = s.cracked()
    //md5加密
    var str_md5 = fun_md5.hex_md5(inputValue)
    //sha1加密
    var str_sha1 = fun_sha1.hex_sha1(inputValue)
    //base64加密
    // var obj_base64 = new fun_base64.Base64();
    // var str_base64_encode = obj_base64.encode(inputValue);
    //base64解密
    // var str_base64_decode = obj_base64.decode(str_base64_encode);
    //aes加密
    var str_aes_encode = this.Encrypt(inputValue);
    var str_aes_encodeBASE64 = this.EncryptBASE64(inputValue)
    //aes解密
    var str_aes_decode = this.Decrypt(str_aes_encode);
    if(inputValue!=''){
      this.setData({
        show_caesar_encode: str_caesar_encode,
        show_caesar_decode: str_caesar_decode,
        show_caesar_key: str_caesar_key,
        show_md5: str_md5,
        show_sha1: str_sha1,
        // show_base64_encode: str_base64_encode,
        // show_base64_decode: str_base64_decode,
        show_aes_encode: str_aes_encode,
        show_aes_decode: str_aes_decode,
        show_aes_encodebase64: str_aes_encodeBASE64
      })
    }else{
      this.setData({
        show_caesar_encode: '',
        show_caesar_decode: '',
        show_caesar_key: str_caesar_key,
        show_md5: '',
        show_sha1: '',
        // show_base64_encode: '',
        // show_base64_decode: '',
        show_aes_encode: '',
        show_aes_decode: '',
        show_aes_encodebase64: ''
      })
    }
  },
  settext: function(e){
    inputValue = e.detail.value
    this.main()
  },
  Encrypt: function (word) {
    var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.ECB, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    //返回大写十六进制加密结果
    return encrypted.ciphertext.toString().toUpperCase();
  },
  EncryptBASE64: function (word) {
    var srcs1 = fun_aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted1 = fun_aes.CryptoJS.AES.encrypt(srcs1, key, { iv: iv, mode: fun_aes.CryptoJS.mode.ECB, padding: fun_aes.CryptoJS.pad.Pkcs7 });
     //返回base64加密结果
    return encrypted1.toString();
  },
  Decrypt: function (word) {
    var encryptedHexStr = fun_aes.CryptoJS.enc.Hex.parse(word);
    var srcs = fun_aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = fun_aes.CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.ECB, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },
  calcFileMd5:function(){
    wx.chooseMessageFile({
      choose:1,
      success: res => {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFiles[0].path, //选择文件返回的相对路径
          // encoding: 'binary', //编码格式
          success: res => {
             //成功的回调
            var spark = new sMD5.ArrayBuffer();
            spark.append(res.data);
            var hexHash = spark.end(false);
            this.setData({
              show_filemd5: hexHash
            })
          }
        })
      }
    })
  },
  createRandom: function(){
    var letter = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
    var result = ''
    for(var i=0;i<=15;i++){
      var rand = Math.floor(Math.random()*16)
      result += letter[rand]
    }
    this.setData({
      Key: result
    })
    key = fun_aes.CryptoJS.enc.Utf8.parse(result);  
    this.main()
  },
  onHide: function(){
    inputValue = ''
    this.main()
    this.setData({
      inputValue: '',
      show_caesar_encode: '',
      show_caesar_decode: '',
      show_caesar_key: '',
      show_md5: '',
      show_filemd5: '',
      show_sha1: '',
      Key: '1234567890abcdef',
      // show_base64_encode: '',
      // show_base64_decode: '',
      show_aes_encode: '',
      show_aes_decode: ''
    })
  },
  clearText:function(){
    inputValue = ''
    this.main()
    this.setData({
      inputValue: ''
    })
  },
  onTapShowTextHintDlg: function( oEvent )
	{
		this.setData({
			bTextHintDlgShow: true,
		});
  },
  onTapHideTextHintDlg: function( oEvent )
	{
		this.setData({
			bTextHintDlgShow: false
		});
  },
  onTapTextHintItem: function( oEvent )
	{
		let nIndex;
		nIndex	= parseInt( oEvent.currentTarget.dataset.index );
		if ( nIndex >= 0 && nIndex < this.data.arrPasswordHintList.length )
		{
			this.setData({
				inputValue: this.data.arrPasswordHintList[ nIndex ],
			});
    }
    inputValue = this.data.arrPasswordHintList[ nIndex ],
		this.setData({
			bTextHintDlgShow: false
    });
    this.main()
	},
})

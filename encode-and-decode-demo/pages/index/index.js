//
//	index.js
//	获取应用实例
//
const app		= getApp();
Page({
	data:
	{
		imgUrls: [
      '/resources/images/b1.jpg',
			'/resources/images/b2.jpg',
			'/resources/images/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
	},
	onLoad: function ( oOptions )
	{
	},
})
/* React Modules */
import axios from 'axios'

// URL
//	  Kakao Talk URI
var _host = 'https://dapi.kakao.com'
var _apis = {
	keyword: '/v2/local/search/keyword.json',
	transcoord: '/v2/local/geo/transcoord.json',
}

// Create axios Object
var _axios = axios.create({
	baseURL: _host,
	headers: {
		Authorization: 'KakaoAK f9bffd8ccf6593843ffa4e7bab86afe7',
	},
})

// Export Functions
//	  For GET HTTP Method
export const api = ({ params, api }) => {
	return _axios.get(_apis[api], { params: params })
}

//	  For get WCONGNAMUL Pos
export const cvtToPos = ({
	x,
	y,
	input_coord = 'WGS84',
	output_coord = 'WCONGNAMUL',
}) => {
	let params = {
		x: x,
		y: y,
		input_coord: input_coord,
		output_coord: output_coord,
	}

	return _axios.get(_apis['transcoord'], { params: params })
}

//	  For get daum Image URL
export const cvtToURL = (x, y) => {
	let url =
		'http://map2.daum.net/map/imageservice?' +
		'IW=300' +
		'&IH=200' +
		'&MX=' +
		x +
		'&MY=' +
		y +
		'&CX=' +
		x +
		'&CY=' +
		y +
		'&SCALE=2.5' +
		'&service=open#.png'

	return url
}

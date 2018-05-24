import axios from 'axios';
import $ from 'jquery';

function isUrl(str){
	let index = str.indexOf('?');
	let urlReg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./:?%&=]*)?$/;
	if(index > -1){
		return urlReg.test(str.substring(0,index));
	} else {
		return false;
	}
  
}

function getQueryByField(field, str){
	let reg = new RegExp("(^|[&?])" + field + "=([^&]*)(&|$)");
	let index = str.indexOf('?');
	if(index > -1){
		let r = str.substring(index).match(reg);
		return (r && r[2]) ? r[2] : false;
	} else {
		return false;
	}
}

function parseJson(str){
  try {
    let obj = JSON.parse(str);
    if (typeof obj == 'object' && obj) {
      return obj;
    } else {
      return 'json 解析失败\n' + e.toString();
    }

  } catch (e) {
    return 'json 解析失败\n' + e.toString();
  }
}

function getJson(url){
	return $.getJSON(url);
}

export default {
	isUrl,
	getQueryByField,
	parseJson,
	getJson
}
function parseUrl(str){
	let reg = new RegExp("(^|[&?])"+ "url" +"=([^&]*)(&|$)");
	let result = str.match(reg);
	if(reg){
		return reg[2]
	}

}


console.log(dir,typeof dir);
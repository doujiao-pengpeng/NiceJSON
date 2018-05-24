Vue.component('item', {
	template: '#showArea',
	props: ['model', 'level'],
	data: function() {
		return {
			open: true
		}
	},
	computed: {
		isFolder: function() {
			return this.model.children && this.model.children.length
		},
		isObject: function() {
			return Object.prototype.toString.call(this.model) === '[object Object]';
		},
		isArray: function() {
			return Array.isArray(this.model);
		},
	},
	methods: {
		toggle: function() {
			this.open = !this.open
		}
	}
})

Vue.component('json-box', {
	template: '#jsonBox',
	data: function() {
		return {
			input: '',
			parsedData: ''
		}
	},
	props: {
		initInput: {
			type: String,
		}
	},
	methods: {
		/**
		 * 判断是否为url
		 * @param  {[String]}  str [要校验的字符串]
		 * @return {Boolean}     [校验结果]
		 */
		isUrl: function(str) {
			let urlReg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
			return urlReg.test(str);
		},

		getQueryString: function(name, str) {
			var reg = new RegExp("(^|[&?])" + name + "=([^&]*)(&|$)");
			var r = str.match(reg);
			console.log(r);
			if (r && r[2]) {
				return r[2];
			} else {
				return false;
			}
		},
		format: function(str) {
			let _this = this;
			// 如果是url
			if (this.isUrl(str.split('?')[0])) {
				let requestUrl = this.getQueryString('url', str);
				if(requestUrl) {
					getJson(requestUrl,function(data){
						if(data){
							console.log(data);
							_this.parsedData = _this.format(JSON.stringify(data));
						} else {
							return '获取数据失败';
						}
					})
				} else {
					return '获取数据失败';
				}
			}

			try {
				let obj = JSON.parse(str);
				if (typeof obj == 'object' && obj) {
					return obj;
				} else {
					return 'json 不合法' + e.toString();
				}

			} catch (e) {
				return 'json 不合法' + e.toString();
			}
		}

	},
	watch: {
		input: function(val) {
			if (val === '') {
				this.parsedData = '';
			} else {
				this.parsedData = this.format(val);
			}
		}
	},

	created: function() {
		if (this.initInput) {
			this.input = this.initInput;
		}
	}
})

function getJson(url, callback){
	$.ajax({
		url:url,
		headers:{"X-Custom-Header":"value"},
		success: function(data){
			callback(data);
		},
		error: function(err){
			console.log(1);
			console.log(err);
		}
	})
}

var data = {
	key0: {
		sex: '男',
		age: 13
	},
	key: [{
		name: 'My Tree',
		children: 'jhhh'
	}, {
		name: 'My Tree',
		children: 'jhhh',
		dangdang: [
			"wode1",
			1, [
				"wode1",
				1, {
					name: 'My Tree',
					children: 'jhhh'
				}
			], {
				name: 'My Tree',
				children: 'jhhh'
			}, {
				name: 'My Tree',
				children: 'jhhh'
			},
			"wode2",
			2
		]
	}],
	key2: '2',
	key3: [1, 2, 3]
}
new Vue({
	el: '#root',
	data: {
		data: JSON.stringify(data)
	}
})
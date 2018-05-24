<template>
  <div id="json-box">
    <div class="input-area">
      <textarea v-model="input"></textarea>
    </div>
    <div class="show-area">
      <nice-json-item
        class="item"
        :model="parsedData"
        :level="0"
        >
      </nice-json-item>
    </div>
  </div>
</template>

<script>
  import util from './util.js';
  export default {
  	name: "nice-json-view",
    props: ['model', 'level'],
    data: function(){
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
      trasfer: function(str){
        let _this = this;
        if (util.isUrl(str)) {
          str = util.getQueryByField('url', str);
          if(str){
            console.log(str)
            util.getJson(str).done(function(data){
              console.log(data);
              _this.parsedData = util.parseJson(data);
            }).fail(() => {
              _this.parsedData = '获取数据失败';
            })
          } else {
            _this.parsedData = '解析url失败' + str;
          }
          
        } else {
          _this.parsedData = util.parseJson(str);
        }
      },
    },
    watch: {
      input: function(val) {
        if (val === '') {
          this.parsedData = '';
        } else {
          this.trasfer(val);
        }
      }
    },

    created: function() {
      if (this.initInput) {
        this.input = this.initInput;
      }
    }
  };
</script>

<style>
  html,body{
    margin:0;
    padding:0;
  }
  div,textarea{
    box-sizing: border-box;
  }
  ul,ol {
    margin: 0;
    padding-left: 2em;
    list-style: none;
  }
  #json-box{
    width: 80%;
    height: 600px;
    margin: 40px auto;
    display: flex;
    flex-direction: row;
  }
  .input-area {
    height: 100%;
    flex:1;
  }
  .input-area textarea, .show-area textarea{
    height: 100%;
    width: 100%;
    padding: 10px;
  }
  .show-area{
    flex:1;
    height: 100%;
    border: 1px solid #333;
    padding: 10px;
    overflow-y: scroll;
    font-size: 12px;
    color: #0e0;
  }
  .show-area .property{
    color: #e00;
  }
  .show-area .toggle {
    color: #e0e;
  }
  .show-area .toggle i.open, .show-area .toggle i{
    display: inline-block;
    font-style: normal;
    cursor: pointer;
    border: 1px solid #333;
    color: #333;
    line-height: 7px;
  }
</style>

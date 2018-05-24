import Vue from 'vue';
import nicejson from './src/index.js';
// import nicejson from './dist/vue-nice-json.min.js';

Vue.use(nicejson);

new Vue({
    el: '#root',
    data() {
        return {
          sampleJSON: {"testArray": ["Just a Test String", "in a Test Array", 0, 1, true, false], "component":"vue-json-tree-view","descripton":"A JSON Tree View built in Vue.js","tags":[{"name":"vue.js"},{"name":"JSON"}],"steps":["HTML Template","Root Component","View Component",{"Transformation Logic":["Transform Objects","Transform Arrays","Transform Values"]},"Animate","Allow Options","Blog about it..."]},
          sampleJSONString: "Just a Test String",
          sampleJSONArray: ["Just a Test String", "in a Test Array", 0, 1, true, false],
          sampleUrl: 'https://www.baidu.com/fjkaj/?url=http://www.kuaidi100.com/query?type=yuantong&postid=11111111111'
        };
    },
});

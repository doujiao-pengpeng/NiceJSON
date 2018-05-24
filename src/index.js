import NiceJsonItem from './NiceJsonItem.vue';
import NiceJsonView from './NiceJsonView.vue';


export default {
	install: function(Vue){
	  Vue.component("nice-json-item", NiceJsonItem);
	  Vue.component("nice-json-view", NiceJsonView);
	}
}

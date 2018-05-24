<template>
  <!-- 判断是不是对象 -->
  <span class="object" v-if="isPlainObject">
    <span class="toggle"><i @click="toggle">{{open?'-':'+'}}</i>{</span>
    <ul v-show="open">
      <li v-for="(value, key, index) in model" :key="index">
        <span class="property">"{{key}}" : </span>

        <!-- 如果是对象或数组，递归 -->
        <nice-json-item v-if="typeof value === 'object'" :level="level+1" :model="value" ></nice-json-item>
        <!-- 如果是基本类型 -->
        <span v-else>"{{value}}"</span>

        <template v-if="index !== (Object.getOwnPropertyNames(model).length-2)">,</template>
      </li>
    </ul>
    <span class="toggle">}</span>
  </span>

  <!-- 判断是不是数组 -->
  <span class="array" v-else-if="isArray">
    <span class="toggle"><i @click="toggle">{{open?'-':'+'}}</i>[</span>
    <ol v-show="open">
      <template v-for="(value, index) in model">

        <!-- 如果是数组或对象 -->
        <li v-if="typeof value === 'object'" :key="index">
          <nice-json-item v-if="typeof value === 'object'" :level="level + 1" :model="value"></nice-json-item>
          <template v-if="index !== model.length-1">,</template>
        </li>
        <!-- 如果是数组或对象，结束 -->

        <!-- 如果是基本类型，此处可以单独引入组件，优化值类型 -->
        <span v-if="typeof value !== 'object'" :key="index">
          "{{value}}" 
          <template v-if="index !== model.length-1">,</template>
        </span>
        <!-- 基本类型结束 -->
      </template>
    </ol>
    <span class="toggle">]</span>
  </span>

  <span v-else >
    {{model}}
  </span>
</template>

<script>
  export default {
  	name: "nice-json-item",
    props: ['model', 'level'],
    data: function(){
    	return {
      	open: true
      }
    },
    computed: {
      isPlainObject: function() {
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
  };
</script>

<style>

</style>

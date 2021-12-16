<script setup>
  function closeSelect() {
      if (this.selectVisible) {
        this.selectVisible = false;
      }
      console.log("Hello");
  }
</script>


<template>
  <div id="filter" class="flex justify-evenly items-center h-16 text-violet-400">
    <div id="search" class="w-1/3">
      <input type="text" class="rounded-full bg-neutral-900 p-1 border-violet-600  hover:border-violet-600/40 focus:outline-violet-600/40 focus:outline-offset-1 focus:outline-4 outline-none  border-2 w-full" v-model="search" placeholder="Search..." />
    </div>
    <div id="sort" class="w-1/3">
      <select v-model="sort" class="rounded-full bg-neutral-900 p-1 border-violet-600  hover:border-violet-600/40 focus:outline-violet-600/40 focus:outline-offset-1 focus:outline-4 outline-none w-full border-2">
        <option value="created_up">created up</option>
        <option value="created_down">created down</option>
        <option value="updated_up" selected>updated up</option>
        <option value="updated_down">updated down</option>
      </select>
    </div>

    <div id="options">
      
      <button @click="selectVisible = !selectVisible"  class="rounded-full bg-neutral-900 border-violet-600  hover:border-violet-600/40 focus:outline-violet-600/40 focus:outline-offset-1 focus:outline-4 outline-none  border-2 px-3">
        ...
      </button>
      
      <div v-click-away="function () {if(selectVisible) selectVisible = false}" v-show="selectVisible" id="select" class="flex flex-col inset-x-3/4 absolute w-20 bg-neutral-900 p-1 pl-2 rounded-xl">
        <div>
          <input type="checkbox" name="normal" id="option_normal" class="w-min">
          <label for="option_normal" class="w-min" >normal</label>
        </div>
        <div>
          <input type="checkbox" name="live" id="option_live" class="w-min">
          <label for="option_live" class="w-min">live</label>
        </div>
        <div>
          <input type="checkbox" name="guest" id="option_guest" class="w-min">
          <label for="option_guest" class="w-min">guests</label>
        </div>
      </div>
    </div>
  </div>

  <hr>

  <div id="user">

  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: '',
        sort: 'updated_up',
        selectVisible: false,
      }
    },
  }
  
</script>

<style scoped>
</style>

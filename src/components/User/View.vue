<template>
  <div
    id="close"
    class="
      h-18
      w-18
      fixed
      top-20
      right-6
      hover:text-violet-900
      text-violet-600 text-6xl
    "
  >
    <b-icon-x
      @click="
        this.$router.push({ path: '/user', hash: '' });
        this.guestName = null;
        this.guestError = null;
        this.guestCreated = false;
      "
    ></b-icon-x>
  </div>

  <h1 class="text-center text-white text-xl pt-10">User view</h1>

</template>

<script>
export default {
  name: "View",
  data() {
    return {
    };
  },
};
</script>

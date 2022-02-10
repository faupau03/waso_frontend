<template>
  <div v-if="authorized && !(this.$route.hash == '#login') && !(this.$route.hash == '#register')" id="app" class="h-screen w-screen">
    <div class="w-full h-16 flex items-center bg-neutral-900">
      <img
        src="/favicon.svg"
        alt=""
        class="m-1 h-14 w-14 p-1 rounded-full bg-violet-900"
      />
      <span class="text-white text-2xl">WaSo</span>
    </div>
    <div class="w-full overscroll-contain h-[calc(100%-8rem)] bg-neutral-800">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <div
      class="
        w-full
        fixed
        bottom-0
        h-16
        flex
        justify-evenly
        items-center
        bg-neutral-900
      "
    >
      <router-link to="/">
        <!-- Check if vue component matches and if it matches, make the icon red -->
        <b-icon-house-fill
          v-if="$route.name == 'Home'"
          class="text-violet-600 w-12 h-12 hover:animate-pulse"
        />
        <b-icon-house-fill v-else class="text-gray-600 w-12 h-12" />
      </router-link>
      <router-link to="/user">
        <b-icon-person-fill
          v-if="$route.name == 'User'"
          class="text-violet-600 w-12 h-12"
        />
        <b-icon-person-fill v-else class="text-gray-600 w-12 h-12" />
      </router-link>
      <router-link to="/game">
        <b-icon-joystick
          v-if="$route.name == 'Game'"
          class="text-violet-600 w-12 h-12"
        />
        <b-icon-joystick v-else class="text-gray-600 w-12 h-12" />
      </router-link>
    </div>
  </div>
  <div v-else-if="this.$route.hash == '#register'" id="register" class="h-screen w-screen bg-neutral-900">
    <Register />
  </div>
  <div v-else id="login" class="h-screen w-screen bg-neutral-900">
    <Login />
  </div>
</template>
<script>
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
export default {
    name: "App",
    components: { Login, Register },
    data() {
        return {
            authorized: false,

        };
    },
};
</script>

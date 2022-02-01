<template>
  <div
    id="close"
    class="h-18 w-18 fixed top-20 right-6 hover:text-violet-900 text-violet-600 text-6xl"
  >
    <b-icon-x @click="this.$router.push({ path: '/game', hash: '' })"></b-icon-x>
  </div>

  <h1 class="text-center text-white text-xl pt-10">Create a new game</h1>

  <!--
      Create an simple form with username and submit button
  -->
  <form @submit.prevent="addGame" class="flex flex-col items-center pt-10 mx-10">
    <input
      v-model="gameName"
      type="text"
      class="w-full max-w-lg h-12 p-2 rounded-lg bg-neutral-900 text-white text-xl outline-none focus:border-violet-600 focus:shadow-outline mb-2"
      placeholder="Create game name"
    />
    {{ options }}
    <div class="w-full max-w-lg rounded-lg">
      <Multiselect
      v-model="value"
      searchable="true"
      :options="user"
      :classes="{container: 'h-12 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded-lg bg-white text-base leading-snug outline-none'}"
      valueProp="id"
      label="name"
      mode="tags"
    />
    </div>

    <div class="h-8">
      <span v-if="this.gameError" id="message" class="text-red-700">
        {{
          this.gameError
        }}
      </span>
      <span v-if="this.gameCreated" class="text-gray-300">Game created</span>
    </div>
    <button
      v-if="gameLoading"
      @click="addGame"
      disabled
      class="w-full max-w-lg h-12 p-2 inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-900 hover:text-gray-400 text-white text-xl"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Create
    </button>

    <button
      v-else
      @click="addGame"
      class="w-full max-w-lg h-12 p-2 inline-flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-900 hover:text-gray-400 text-white text-xl"
    >Create</button>
  </form>
</template>

<script>
import Multiselect from '@vueform/multiselect'

export default {
  components: {
    Multiselect,
  },
  name: "add-guest",
  data() {
    return {
      user: this.$parent.user,
      user_loading: this.$parent.user_loading,
      user_error: this.$parent.user_error,
      gameName: null,
      gameError: null,
      gameLoading: false,
      gameCreated: false,
      selectVisible: false,
      selectedUser: null,
      value: null,
    };
  },
  methods: {
    async addGame() {
      //TODO: rewrite this
      this.guestLoading = true;
      this.guestError = null;
      try {
        if (!this.guestName) {
          this.guestError = new Error("Name is required");
          throw this.guestError;
        }
        const res = await fetch("https://waso-backend.paffnet.de/api/v1/user", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.guestName,
            gid: 2,
          }),
        });
        // a non-200 response code
        if (!res.ok) {
          // create error instance with HTTP status text
          this.guestError = new Error(res.statusText);
          this.guestError.json = res.json();
          console.log("error:" + this.guestError);
        }
        const json = await res.json();
        // set the response data
        console.log("json:" + json);
        this.guestCreated = true;
        this.fetchUser();
      } catch (err) {
        this.guestError.value = err;
        // In case a custom JSON error response was provided
        if (err.json) {
          return err.json.then((json_1) => {
            // set the JSON response message
            this.guestError.value.message = json_1.message;
          });
        }
      }
      this.guestLoading = false;
    },
    fetchUser() {
      this.user_loading = true;
      return fetch("https://waso-backend.paffnet.de/api/v1/user", {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            this.user_error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }
          return res.json();
        })
        .then((json) => {
          this.user = json;
        })
        .catch((err) => {
          this.user_error = err;
          this.user_loading = false;
        })
        .finally(() => {
          this.user_loading = false;
        });
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>


<style src="@vueform/multiselect/themes/default.css"></style>
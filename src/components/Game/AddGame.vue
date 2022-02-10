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
      @click="this.$router.push({ path: '/game', hash: '' })"
    ></b-icon-x>
  </div>

  <h1 class="text-center text-white text-xl pt-10">Create a new game</h1>

  <!--
      Create an simple form with username and submit button
  -->
  <form
    @submit.prevent="addGame"
    class="flex flex-col items-center pt-10 mx-10"
  >
    <input
      v-model="gameName"
      type="text"
      class="
        w-full
        border border-neutral-600
        max-w-lg
        h-12
        p-2
        rounded-lg
        bg-neutral-900
        text-white text-xl
        outline-none
        focus:ring focus:ring-violet-900 focus:ring-opacity-90
        mb-2
      "
      placeholder="Create game name"
    />
    <div class="w-full max-w-lg rounded-lg">
      <Multiselect
        v-model="value"
        :search="true"
        searchable="true"
        max="10"
        :options="user"
        :close-on-select="false"
        :classes="{
          container:
            'min-h-[3rem] py-1 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-neutral-600 rounded-lg bg-neutral-900 text-base leading-snug outline-none',
          containerActive: 'ring ring-violet-900 ring-opacity-90',
          containerOpen: 'rounded-b-none',
          dropdown:
            'max-h-60 absolute -left-px -right-px bottom-0 text-white transform translate-y-full border border-neutral-600 -mt-px overflow-y-scroll z-50 bg-neutral-900 flex flex-col rounded-b-lg',
          dropdownTop:
            '-translate-y-full top-px bottom-auto flex-col-reverse rounded-b-none rounded-t',
          dropdownHidden: 'hidden',
          tag: 'bg-violet-600 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap',
          tagsSearch:
            'absolute inset-0 border-0 outline-none focus:ring-0 bg-neutral-900 text-white appearance-none p-0 text-base font-sans box-border w-full',
        }"
        valueProp="id"
        label="name"
        mode="tags"
      />
    </div>
    <div class="w-full max-w-lg mt-3">
      <input
        v-model="money"
        class="
          ml-3
          rounded
          bg-neutral-900
          border-neutral-600
          text-violet-600
          shadow-sm
          focus:border-violet-300
          focus:ring
          focus:ring-offset-0
          focus:ring-violet-200
          focus:ring-opacity-50
        "
        id="withMoney"
        aria-describedby="withMoney"
        type="checkbox"
      />
      <label class="ml-3 text-white" for="withMoney"
        >With Money</label
      >
    </div>
    {{ gameName }}
    {{ value }}
    {{ money }}
    <div class="h-8">
      <span v-if="this.gameError" id="message" class="text-red-700">
        {{ this.gameError }}
      </span>
      <span v-if="this.gameCreated" class="text-gray-300">Game created</span>
    </div>
    <button
      v-if="gameLoading"
      @click="addGame"
      disabled
      class="
        w-full
        max-w-lg
        h-12
        p-2
        inline-flex
        cursor-not-allowed
        items-center
        justify-center
        rounded-lg
        bg-violet-600
        hover:bg-violet-900 hover:text-gray-400
        text-white text-xl
      "
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
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
      class="
        w-full
        max-w-lg
        h-12
        p-2
        inline-flex
        items-center
        justify-center
        rounded-lg
        bg-violet-600
        hover:bg-violet-900 hover:text-gray-400
        text-white text-xl
      "
    >
      Create
    </button>
  </form>
</template>

<script>
import Multiselect from "@vueform/multiselect";

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
      money: false,
    };
  },
  methods: {
    async addGame() {
      this.gameLoading = true;
      this.gameError = null;
      try {
        if (!this.gameName) {
          this.gameError = new Error("Name is required");
          throw this.gameError;
        }
        if (this.value.length < 2) {
          this.gameError = new Error("At least 2 players required");
          throw this.gameError;
        }
        const payload = JSON.stringify({
            name: this.gameName,
            user: this.value,
            money: this.money,
          });
        console.log(payload);
        const res = await fetch("https://waso-backend.paffnet.de/api/v1/game", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: payload,
        });
        // a non-200 response code
        if (!res.ok) {
          // create error instance with HTTP status text
          this.gameError = new Error(res.statusText);
          this.gameError.json = res.json();
          console.log("error:" + this.gameError);
        }
        const json = await res.json();
        // set the response data
        console.log("json:" + json);
        this.gameCreated = true;
        this.fetchUser();
      } catch (err) {
        this.gameError.value = err;
        // In case a custom JSON error response was provided
        if (err.json) {
          return err.json.then((json_1) => {
            // set the JSON response message
            this.gameError.value.message = json_1.message;
          });
        }
      }
      this.gameLoading = false;
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
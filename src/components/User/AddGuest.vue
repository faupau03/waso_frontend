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

  <h1 class="text-center text-white text-xl pt-10">Adding a guest</h1>

  <!--
      Create an simple form with username and submit button
    -->
  <form
    @submit.prevent="addGuest"
    class="flex flex-col items-center pt-10 mx-10"
  >
    <input
      v-model="guestName"
      type="text"
      class="
        w-full
        h-12
        p-2
        rounded-lg
        bg-neutral-900
        text-white text-xl
        outline-none
        focus:border-violet-600 focus:shadow-outline
        mb-2
      "
      placeholder="Username"
    />
    <div class="h-8">
      <span v-if="this.guestError" id="message" class="text-red-700">
        {{ this.guestError }}
      </span>
      <span v-if="this.guestCreated" class="text-gray-300">
        guest account was created
      </span>
    </div>
    <button
      v-if="guestLoading"
      @click="addGuest"
      disabled=""
      class="
        w-full
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
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Add Guest
    </button>

    <button
      v-else
      @click="addGuest"
      class="
        w-full
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
      Add Guest
    </button>
  </form>
</template>

<script>
export default {
  name: "add-guest",
  data() {
    return {
      guestName: null,
      guestError: null,
      guestLoading: false,
      guestCreated: false,
    };

  },
  methods: {
    fetchUser() {
      this.$parent.fetchUser();
    },
    async addGuest() {
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
            }
            catch (err) {
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
  }
};
</script>

<template>
  <div
    v-if="this.$route.hash == '#addGuest'"
    id="addGuest"
    class="w-full h-full"
  >
    <AddGuest />
  </div>

  <div v-else-if="Number.isInteger(parseInt(this.$route.hash.substring(1)))" id="view" class="w-full h-fu">
    <View />
  </div>

  <div v-else class="h-full">
    <UserFilter />

    <hr />

    <div id="user" class="h-[calc(100%-4rem)]">
      <div
        v-show="!loading && data && !error"
        id="user_data"
        class="flex flex-wrap overflow-auto max-h-full"
      >
        <div
          v-for="user in search_data"
          :key="user"
          @click="this.$router.push({ path: '/user', hash: '#'+ user.id });"
          class="
            rounded-lg
            border-violet-600/60 border
            hover:outline-violet-600 hover:outline-2 hover:outline
            h-20
            p-2
            w-[calc(50%-1.5rem)]
            overflow-hidden
            sm:w-[calc(33%-1.5rem)]
            md:w-[calc(25%-1.5rem)]
            bg-neutral-900
            m-3
          "
        >
          <div class="flex space-x-4">
            <div class="rounded-full bg-neutral-600 h-10 w-10"></div>
            <div class="flex-1 space-y-0 py-0">
              <div class="h-6 text-lg text-white rounded p-0">
                {{ user.name }}
              </div>
              <div class="h-4 w-1/2 text-white text-xs p-0 rounded">
                #{{ user.id }}
              </div>
              <div class="space-y-3">
                <div class="grid grid-cols-2 gap-2">
                  <div class="h-8 text-lg text-white rounded col-span-1">
                    {{ user.money }}€
                  </div>
                  <div class="h-8 text-lg text-white rounded col-span-1">
                    {{ user.wins }}👑
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="loading" class="flex flex-wrap overflow-auto">
        <div
          v-for="n in 9"
          :key="n"
          class="
            rounded-lg
            border-violet-600/60 border
            h-20
            p-2
            w-[calc(50%-1.5rem)]
            overflow-hidden
            sm:w-[calc(33%-1.5rem)]
            md:w-[calc(25%-1.5rem)]
            bg-neutral-900
            m-3
          "
        >
          <div class="flex space-x-4 animate-pulse">
            <div class="rounded-full bg-neutral-600 h-10 w-10"></div>
            <div class="flex-1 space-y-2 py-1">
              <div class="h-2 bg-neutral-600 rounded"></div>
              <div class="h-1 w-1/2 bg-neutral-600 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-2 gap-4">
                  <div class="h-8 bg-neutral-600 rounded col-span-1"></div>
                  <div class="h-8 bg-neutral-600 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="error" id="user_error">error</div>
    </div>
    <div
      id="addUser"
      class="
        border-2 border-violet-600
        hover:outline hover:outline-4 hover:outline-offset-1 hover:outline-violet-600/40
        focus:outline focus:outline-4 focus:outline-offset-1 focus:outline-violet-600/40
        outline-none
        rounded-full
        h-16
        w-16
        bg-neutral-900
        fixed
        bottom-20
        right-6
      "
    >
      <b-icon-plus
        @click="this.$router.push({ path: '/user', hash: '#addGuest' })"
        class="text-violet-600 text-7xl  relative bottom-1.5 -left-1.5"
      ></b-icon-plus>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import UserFilter from "./UserFilter.vue";
import AddGuest from "./AddGuest.vue";
import View from "./View.vue";
import { t } from "../../../dist/assets/vendor.88830552";
import { e } from "../../../dist/assets/vendor.88830552";

export default {
  components: {
    UserFilter,
    AddGuest,
    View
  },
    data() {
        return {
            sort: "updated_up",
            selectVisible: false,
            loading: false,
            error: null,
            data: null,
            search_data: null,
            search_val: "",
        };
    },
    methods: {
        async fetchUser() {
            this.loading = true;
            try {
                const res = await fetch("https://waso-backend.paffnet.de/api/v1/user", {
                    method: "get",
                    headers: {
                        "content-type": "application/json",
                    },
                });
                // a non-200 response code
                if (!res.ok) {
                    // create error instance with HTTP status text
                    this.error = new Error(res.statusText);
                    error.json = res.json();
                    throw error;
                }
                const json = await res.json();
                // set the response data
                this.data = json;
                this.search_data = this.data;
            }
            catch (err) {
                this.error.value = err;
                // In case a custom JSON error response was provided
                if (err.json) {
                    return err.json.then((json_1) => {
                        // set the JSON response message
                        this.error.value.message = json_1.message;
                    });
                }
            }
            for (let i = 0; i < this.data.length; i++) {
                this.data[i].wins = 0;
                for (let j = 0; j < this.data[i].games.length; j++) {
                    this.data[i].wins += 1;
                }
            }
            this.loading = false
        },

        hasName(el) {
          console.log(el.name);
          if (!el.name) {
            return false;
          }
          else if (el.name.toLowerCase().includes(this.search_val.toLowerCase())) {
            return true;
          }
        },

        search(val) {
          this.search_val = val;
          console.log("searching for: " + val);
          console.log(JSON.stringify(this.data));
          console.log("Is data an array: " + Array.isArray(this.data));
          if (val.length < 1) {
            this.search_data = this.data;
          }
          else {
            //this.search_data = this.data.filter(el => el.name.toLowerCase().includes(val.toLowerCase()));
            this.search_data = this.data.filter(this.hasName);
            console.log("found: " + this.search_data);
          }
        },
        sortBy() {
          if (this.sort === "updated_up") {
            //This is not implemented yet
            
            /*
            array.sort(function(a, b) {
                var c = new Date(a.date);
                var d = new Date(b.date);
                return c-d;
            });
            */
          }
        },
    },
    created() {
        this.fetchUser();
    },
};
</script>

<style scoped></style>

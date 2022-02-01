<template>
  <div
    v-if="siteType() === 'view'"
    id="view"
    class="w-full h-full"
  > 
    <View />
  </div>

  <div v-else-if="siteType() === 'edit'" id="view" class="w-full h-full">
    <!-- <Edit /> -->
  </div>
  <div v-else-if="siteType() === 'add'" id="view" class="w-full h-fu">
    <AddGame />
  </div>

  <div v-else class="h-full">
    <GameFilter />
    <hr />

    <div
      id="game"
      class="h-[calc(100%-4rem)]"
      @click="hideGameMenu($event, true)"
    >
      <div
        v-show="!loading && data && !error"
        id="game_data"
        class="flex flex-wrap overflow-auto max-h-full"
      >
        <div
          v-for="game in search_data"
          :key="game"
          class="game_element relative w-[calc(50%-1.5rem)] overflow-hidden sm:w-[calc(33%-1.5rem)] md:w-[calc(25%-1.5rem)] p-3"
        >
          <div v-if="true" class="">
            <b-icon-check-circle-fill
              class="z-10 absolute h-4 w-4 top-[6px] right-[6px] text-green-500"
            ></b-icon-check-circle-fill>
          </div>
          <div
            v-else-if="new Date() - game.updated < 300"
            class="rounded-full animate-ping bg-red-600 h-5 w-5"
          >
            <span
              class="z-20 animate-ping absolute inline-flex h-4 top-[6px] right-[6px] w-4 rounded-full bg-red-400 opacity-75"
            ></span>
            <span
              class="z-20 absolute rounded-full h-4 w-4 top-[6px] right-[6px] bg-red-500"
            ></span>
          </div>
          <div v-else class="">
            <b-icon-clock-fill
              class="z-10 absolute h-4 w-4 top-[6px] right-[6px] text-white"
            ></b-icon-clock-fill>
          </div>

          <div
            class="hidden absolute game_menu w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-lg z-10"
          >
            <button
              class="edit z-10 w-1/2 h-full text-white bg-neutral-600/[0.9] rounded-l-lg hover:bg-neutral-700/[0.9] hover:outline-1 hover:outline hover:outline-violet-600 border-r-[1px] border-violet-600"
              @click="
                this.$router.push({ path: '/game', hash: '#edit_' + game.id })
              "
            >
              <b-icon-pencil-square
                class="text-3xl m-auto"
              ></b-icon-pencil-square>
            </button>
            <button
              class="view z-10 w-1/2 h-full text-white bg-neutral-600/[0.9] rounded-r-lg hover:bg-neutral-700/[0.9] hover:outline-1 hover:outline hover:outline-violet-600"
              @click="
                this.$router.push({ path: '/game', hash: '#view_' + game.id })
              "
            >
              <b-icon-eye class="text-3xl m-auto"></b-icon-eye>
            </button>
          </div>

          <div
            class="relative rounded-lg border-violet-600/60 border hover:outline-violet-600 hover:outline-2 hover:outline h-20 p-2 w-full bg-neutral-900"
            @click="hideGameMenu($event, false), showGameMenu($event)"
          >
            <div class="flex space-x-4">
              <div class="flex-1 space-y-0 py-0">
                <div class="h-6 text-lg text-white rounded p-0">
                  {{ game.name }}
                </div>
                <div class="h-4 w-1/2 text-white text-xs p-0 rounded">
                  #{{ game.id }}
                </div>
                <div class="space-y-3">
                  <div class="grid grid-cols-2 gap-2">
                    <div class="h-8 text-lg text-white rounded col-span-1">
                      {{ game.money }}€
                    </div>
                    <div class="h-8 text-lg text-white rounded col-span-1">
                      {{ game.finished }}👑
                    </div>
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
          class="rounded-lg border-violet-600/60 border h-20 p-2 w-[calc(50%-1.5rem)] overflow-hidden sm:w-[calc(33%-1.5rem)] md:w-[calc(25%-1.5rem)] bg-neutral-900 m-3"
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
      id="addGame"
      class="border-2 border-violet-600 hover:outline hover:outline-4 hover:outline-offset-1 hover:outline-violet-600/40 focus:outline focus:outline-4 focus:outline-offset-1 focus:outline-violet-600/40 outline-none rounded-full h-16 w-16 bg-neutral-900 fixed bottom-20 right-6"
    >
      <b-icon-plus
        @click="this.$router.push({ path: '/game', hash: '#add' })"
        class="text-violet-600 text-7xl relative bottom-1.5 -left-1.5"
      ></b-icon-plus>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import GameFilter from "./GameFilter.vue";
import AddGame from "./AddGame.vue";
import View from './View.vue';

export default {
  components: {
    GameFilter,
    AddGame,
    View,
    //  View
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
      game_id: null,
      game: null,
      user: null,
      user_loading: false,
      user_error: null,
    };
  },
  methods: {
    fetchGames() {
      this.loading = true;
      return fetch("https://waso-backend.paffnet.de/api/v1/game", {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            this.error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }
          return res.json();
        })
        .then((json) => {
          this.data = json;
          this.search_data = json;
        })
        .catch((err) => {
          this.error = err;
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
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
    getUserName(id) {
      if (this.user) {
        return this.user.find((user) => user.id == id).name;
      }
    },
    hasName(el) {
      console.log(el.name);
      if (!el.name) {
        return false;
      } else if (
        el.name.toLowerCase().includes(this.search_val.toLowerCase())
      ) {
        return true;
      }
    },
    showGameMenu(event) {
      const menu =
        event.currentTarget.parentElement.querySelector(".game_menu");
      if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
      } else {
        menu.classList.add("hidden");
      }
    },
    hideGameMenu(event, check) {
      if (check && event.target.id != "game") {
        return;
      }
      const menus = document.getElementsByClassName("game_menu");
      Array.from(menus).forEach((element) => {
        element.classList.add("hidden");
      });
    },
    setGame(id) {
      const data = this.data;
      const game = data.find((el) => el.id == id);
      console.log(game);
      this.game = game;
    },
    siteType() {
      if (this.$route.hash.includes("#view_")) {
        this.game_id = this.$route.hash.split("#view_")[1]; //"#view_100" => 100
        this.setGame(this.game_id);
        //console.log(this.game_id);
        return "view";
      } else if (this.$route.hash.includes("#edit_")) {
        this.game_id = this.$route.hash.split("#edit_")[1];
        this.setGame(this.game_id);
        //console.log(this.game_id);
        return "edit";
      } else if (this.$route.hash == "#add") {
        this.game_id = null;
        //console.log(this.game_id);
        return "add";
      } else {
        return "list";
      }
    },
    search(val) {
      this.search_val = val;
      console.log("searching for: " + val);
      console.log(JSON.stringify(this.data));
      console.log("Is data an array: " + Array.isArray(this.data));
      if (val.length < 1) {
        this.search_data = this.data;
        this.sortBy();
      } else {
        //this.search_data = this.data.filter(el => el.name.toLowerCase().includes(val.toLowerCase()));
        this.search_data = this.data.filter(this.hasName);
        console.log("found: " + this.search_data);
        this.sortBy();
      }
    },

    sortBy(sort) {
      if (sort) {
        this.sort = sort;
      }
      if (this.sort === "updated_up") {
        //This is not implemented yet
        /*
            array.sort(function(a, b) {
                var c = new Date(a.date);
                var d = new Date(b.date);
                return c-d;
            });
            */
      } else if (this.sort === "updated_down") {
        // This is not implemented yet
      } else if (this.sort == "created_up") {
        this.search_data.sort(function (a, b) {
          var c = new Date(a.created);
          var d = new Date(b.created);
          return c - d;
        });
      } else if (this.sort == "created_down") {
        this.search_data.sort(function (a, b) {
          var c = new Date(a.created);
          var d = new Date(b.created);
          return d - c;
        });
      } else {
        // Nothing
      }
    },
  },
  created() {
    this.fetchGames();
    //this.fetchUser();
  },
  
};
</script>

<style scoped></style>

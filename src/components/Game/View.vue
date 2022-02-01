<template>
    <div
        id="close"
        class="h-18 w-18 fixed top-20 right-6 hover:text-violet-900 text-violet-600 text-6xl"
    >
        <b-icon-x
            @click="
                this.$router.push({ path: '/game', hash: '' });
            "
        ></b-icon-x>
    </div>
    <div class="w-full h-full" v-show="!user_loading && user_error"></div>
    <div class="w-full h-full" v-show="user_loading">Loading...</div>
    <div class="w-full h-full table-auto table" v-show="!user_loading">
        <div class="h-full table-cell border-x" v-for="(game, id, index) in game.data" :key="index">
            <div class="w-full text-center text-white text-xl my-2">{{ getUserName(id) }}</div>
            <div class="w-full text-center text-neutral-400 text-lg">#{{ id }}</div>
            <div class="w-full flex justify-evenly">
                <div class="money text-white flex">
                    {{ currentMoney(id) }}
                    <b-icon-currency-euro class="text-xl ml-1"></b-icon-currency-euro>
                </div>
                <div class="pauses text-white flex">
                    {{ currentPauses(id) }}
                    <b-icon-slash-circle class="text-xl ml-1"></b-icon-slash-circle>
                </div>
            </div>
            <hr class />
            <div class="w-full">
                <div
                    class="text-center text-neutral-400 text-lg"
                    v-for="point in game"
                    :key="point"
                >{{ point }}</div>
            </div>
        </div>
    </div>
    <!-- <View /> -->
</template>

<script>
export default {
    data() {
        return {
            game: this.$parent.game,
            user: null,
            user_loading: false,
            user_error: null,
        };
    },
    methods: {
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
        currentMoney(id) {
            let length = this.game.data[id].length;
            let last_point = this.game.data[id][length - 1];
            if (!last_point) {
                return 0;
            }
            else if (last_point == "-") {
                while (last_point == "-") {
                    length--;
                    last_point = this.game.data[id][length - 1];
                }
                return 0.1 * last_point;
            }
            else if (last_point <= 30) {
                return 0.1 * last_point;
            }
            else {
                return 3;
            }
        },
        currentPauses(id) {
            let data = this.game.data[id];
            let pauses = [];
            pauses = data.filter((point) => point == "-");
            return pauses.length;
        },
        getUserName(id) {
            if (this.user) {
                return this.user.find((user) => user.id == id).name;
            }
        },
    },
    created() {
        this.fetchUser();
    },
};
</script>

<style scoped></style>

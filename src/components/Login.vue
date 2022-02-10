<template>
    <div id="login" class="w-screen h-screen">
        <div class="w-full h-16 flex items-center bg-neutral-900 pt-5">
            <img src="/favicon.svg" alt class="m-5 h-14 w-14 p-1 rounded-full bg-violet-900" />
            <span class="text-white text-2xl">WaSo</span>
        </div>

        <!-- Login form with login button and register option below -->
        <form
            action
            @submit.prevent="login"
            id="login-form"
            class="flex flex-col items-center mx-5"
        >
            <div class="text-white text-xl p-2 my-5 w-min">Login</div>

            <label class="text-white w-full max-w-lg mb-1" for="email">E-Mail</label>
            <input
                type="email"
                name="email"
                placeholder="E-Mail"
                id="email"
                class="max-w-lg w-full mb-5 rounded-lg h-12 p-2 bg-neutral-800 text-white text-xl outline-0 ring-0 focus:border-violet-600 focus:ring-violet-600"
            />
            <label class="text-white w-full max-w-lg mb-1" for="password">Password</label>
            <div id="password-container" class="items-center flex relative w-full max-w-lg mb-5">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                    class="max-w-lg w-full rounded-lg h-12 p-2 pr-12 bg-neutral-800 text-white text-xl outline-0 ring-0 focus:border-violet-600 focus:ring-violet-600"
                />
                <button type="button" class="absolute flex mr-3 right-0 top-0 text-center h-full items-center" @click="togglePasswordVisible">
                    <b-icon-eye v-show="!passwordVisible" class="text-neutral-400 hover:text-white"></b-icon-eye>
                    <b-icon-eye-slash v-show="passwordVisible" class="text-neutral-400 hover:text-white"></b-icon-eye-slash>
                </button>
            </div>
            <span v-show="error" class="text-red-500 text-sm mb-4">{{ error }}</span>
            <button
                v-if="loading"
                @click="login"
                disabled
                class="max-w-lg w-full h-12 p-2 inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-900 hover:text-gray-400 text-white text-xl"
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
                Login
            </button>

            <button
                v-else
                @click="login"
                type="submit"
                class="w-full max-w-lg h-12 p-2 inline-flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-900 hover:text-gray-400 text-white text-xl"
            >Login</button>
            <button
                id="register-button"
                class="max-w-xs mt-10 rounded-lg text-neutral-300 w-full bg-neutral-700 hover:bg-neutral-800 focus:ring-0"
                @click="register"
            >Register</button>
        </form>
    </div>
</template>

<script>
import router from "../router";

export default {
    //functions
    data() {
        return {
            loading: false,
            error: null,
            user: null,
            passwordVisible: false,
        };
    },
    methods: {
        login() {
            //login
            console.log("login");
            // Post fetch to backend with credentials from login-form
            // If successful, redirect to dashboard
            // If not, show error message
            this.loading = true;
            return fetch("https://waso-backend.paffnet.de/api/v1/login", {
                method: "post",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        this.error = new Error(res.statusText);
                        this.error.json = res.json();
                        throw this.error;
                    }
                    return res.json();
                })
                .then((json) => {
                    this.user = json;
                })
                .catch((err) => {
                    this.error = err;
                    this.loading = false;
                })
                .finally(() => {
                    this.loading = false;
                    this.$parent.authorized = true;
                });
        },
        register() {
            router.push("/#register");
        },
        togglePasswordVisible() {
            if (this.passwordVisible) {
                this.passwordVisible = false;
                document.getElementById("password").type = "password";
            } else {
                this.passwordVisible = true;
                document.getElementById("password").type = "text";
            }
        },
    },
};
</script>

<style></style>

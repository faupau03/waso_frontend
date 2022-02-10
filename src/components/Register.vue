<template>
    <div id="login" class="w-screen h-screen">
        <div class="w-full h-16 flex items-center bg-neutral-900 pt-5">
            <img src="/favicon.svg" alt class="m-5 h-14 w-14 p-1 rounded-full bg-violet-900" />
            <span class="text-white text-2xl">WaSo</span>
        </div>

        <!-- Login form with register button and register option below -->
        <form action="" @submit.prevent="register" id="register-form" class="flex flex-col items-center mx-5">
            <div class="text-white text-xl p-2 my-5 w-min">Register</div>
            <label class="text-white w-full max-w-lg mb-1" for="email">Username</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                class="max-w-lg w-full mb-5 rounded-lg h-12 p-2 bg-neutral-800 text-white text-xl outline-0 ring-0 focus:border-violet-600 focus:ring-violet-600"
            />
            <!-- Create new username or choose guest username in selection -->
            

            <label class="text-white w-full max-w-lg mb-1" for="email">E-Mail</label>
            <input
                type="email"
                name="email"
                placeholder="E-Mail"
                id="email"
                class="max-w-lg w-full mb-5 rounded-lg h-12 p-2 bg-neutral-800 text-white text-xl outline-0 ring-0 focus:border-violet-600 focus:ring-violet-600"
            />
            <label class="text-white w-full max-w-lg mb-1" for="password">Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                class="max-w-lg w-full mb-5 rounded-lg h-12 p-2 bg-neutral-800 text-white text-xl outline-0 ring-0 focus:border-violet-600 focus:ring-violet-600"
            />
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
                Register
            </button>

            <button
                v-else
                @click="register"
                class="w-full max-w-lg h-12 p-2 inline-flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-900 hover:text-gray-400 text-white text-xl"
            >Register</button>

            <!-- Redirect to login page -->
            <button
                id="register-button"
                class="max-w-xs mt-10 rounded-lg text-neutral-300 w-full bg-neutral-700 hover:bg-neutral-800 focus:ring-0"
                @click="login"
            >Login</button>
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

        };
    },
    methods: {
        login() {
            router.push("/#login");
        },
        register() {
            //TODO: Register
            
            console.log("Register");
        },
        fetchGuests() {
        },
    }
}
</script>

<style>
</style>
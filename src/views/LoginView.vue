<template>
  <div class="min-h-screen">
    <main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0 text-center">
      <template v-if="user === undefined">
        <p>Loading...</p>
      </template>
      <template v-else>
        <div
          class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
          v-if="error"
        >
          {{ error }}
        </div>

        <div v-else-if="route.query.redirectTo">
          <p>You need to Sign In to access this page.</p>
        </div>

        <div class="mb-10">
          <p class="mt-2 text-sm text-gray-500">
            Guest users are able only to
            <span class="text-gray-700">update</span> the data.
          </p>
          <p class="mt-2 text-sm text-gray-500">
            SignIn with Google to <span class="text-gray-700">create</span> and
            <span class="text-gray-700">delete</span>.
          </p>
        </div>
        <template v-if="user">
          <p>
            You are currently logged in as:
            <br />
            <img
              class="avatar mx-auto"
              v-if="user.photoURL"
              :src="user.photoURL"
              referrerpolicy="no-referrer"
            />
            <br />
            <strong>{{ user.displayName ? user.displayName : 'Guest' }}</strong>
          </p>

          <button @click="signOut(auth)">Logout</button>
        </template>

        <template v-else>
          <button @click="signinRedirect()">
            SignIn with Google (redirect)
          </button>
          <br />
          <button @click="signinPopup()">SignIn with Google (popup)</button>
          <br />
          <button @click="signInAnonymously(auth)">SignIn Anonymously</button>
        </template>
      </template>
    </main>
  </div>
</template>

<script lang="ts">
import { GoogleAuthProvider } from 'firebase/auth';
export const googleAuthProvider = new GoogleAuthProvider();
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  getRedirectResult,
  signInAnonymously,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { getCurrentUser } from 'vuefire';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
const auth = useFirebaseAuth()!;
const user = useCurrentUser();
function signinRedirect() {
  signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
    error.value = reason;
  });
}
function signinPopup() {
  error.value = null;
  signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    error.value = reason;
  });
}
// display errors if any
const error = ref<Error | null>(null);

const route = useRoute();
const router = useRouter();
onMounted(async () => {
  getRedirectResult(auth).catch((reason) => {
    error.value = reason;
  });
  const currentUser = await getCurrentUser();
  if (currentUser) {
    const to =
      route.query.redirectTo && typeof route.query.redirectTo === 'string'
        ? route.query.redirectTo
        : '/';

    router.push(to);
  }
});
</script>

<style scoped>
.avatar {
  padding: 1em 0;
}
main > button {
  margin: 1em 0;
}
</style>

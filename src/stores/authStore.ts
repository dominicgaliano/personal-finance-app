import { writable } from "svelte/store";
import type { authStoreState } from "./authStore.d";

const authStore = writable<authStoreState>({
  isLoggedIn: false,
  firebaseControlled: false,
});

export default {
  subscribe: authStore.subscribe,
  set: authStore.set,
};

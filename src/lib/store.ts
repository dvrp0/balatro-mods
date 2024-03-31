import { writable } from "svelte/store";

export let latest = writable({} as {
    [key: string]: string
});
<script lang="ts">
    import { expoOut } from "svelte/easing";
    import { fade } from "svelte/transition";

    export let src: string | undefined = undefined;

    function close()
    {
        src = undefined;
    }
</script>

{#if src}
    <div transition:fade={{ easing: expoOut, duration: 250 }} role="button" tabindex="0" on:click={close} on:keydown={close}>
        <img class="fixed min-h-[60%] max-w-[calc(100vw-10%)] max-h-[calc(100vh-10%)]
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-xl"
            {src} alt="Focused" />
        <div class="fixed top-0 left-0 w-screen h-screen bg-black/50 z-10"></div>
    </div>
{/if}
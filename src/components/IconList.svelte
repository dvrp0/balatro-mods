<script lang="ts">
    import Icon from "$components/Icon.svelte";
    import LargeImageViewer from "$components/LargeImageViewer.svelte";
    import Rich from "$components/Rich.svelte";

    export let kind: string;
    export let items: string[];

    let selectedImage: string | undefined = undefined;
</script>

<LargeImageViewer bind:src={selectedImage} />
<div class="flex flex-col">
    {#each items as item, i (item)}
        <div class="flex items-start justify-center {i < items.length - 1 ? "mb-4" : ""}">
            {#if item.startsWith("img::")}
                {@const src = item.split("::")[1]}
                <img class="rounded-xl" {src} alt="Screenshot" loading="lazy" on:click={() => {
                    selectedImage = src;
                }} />
            {:else}
                <div class="flex-0.1 mt-[0.2rem]">
                    <Icon {kind} />
                </div>
                <div class="flex-1 ml-2">
                    <Rich text={item} />
                </div>
            {/if}
        </div>
    {/each}
</div>
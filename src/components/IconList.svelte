<script lang="ts">
    import Icon from "$components/Icon.svelte";
    import Rich from "$components/Rich.svelte";

    export let kind: string;
    export let items: string[];
</script>

<div class="flex flex-col">
    {#each items as item, i (item)}
        <div class="flex items-start justify-center {i < items.length - 1 ? "mb-4" : ""}">
            {#if item.startsWith("<img")}
                <div class="*:rounded-xl">
                    {@html item}
                </div>
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
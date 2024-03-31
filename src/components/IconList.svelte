<script lang="ts">
    import Icon from "$components/Icon.svelte";
    import Rich from "$components/Rich.svelte";

    export let kind: string;
    export let items: string[];
</script>

<div class="flex flex-col">
    {#each items as item (item)}
        <div class="flex items-center mb-4">
            <div class="flex-0.1">
                <Icon {kind} />
            </div>
            <div class="flex-1 ml-2">
                <Rich text={item} />
            </div>
        </div>
    {/each}
</div>
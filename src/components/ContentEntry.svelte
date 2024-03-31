<script lang="ts">
    import Icon from "$components/Icon.svelte";
    import Rich from "$components/Rich.svelte";

    export let name: string;
    export let type: string;
    export let tag: string | undefined = undefined;
    export let cost: number | undefined = undefined;
    export let description: string;
    export let image: string;
</script>

<div class="flex flex-col bg-gray-100 rounded-xl w-full p-6 transition-all duration-300">
    <div class="flex items-center">
        <img class="flex-[30%]" src={image} alt={name} loading="lazy" />
        <div class="ml-4 flex flex-col flex-[100%]">
            <span class="font-bold">{name}</span>
            <div class="mb-4 flex items-center flex-wrap">
                <span class="text-gray-400">{type}</span>
                {#if tag}
                    <div class="mx-1">
                        <Icon kind="sparkle" color="bg-gray-400" />
                    </div>
                    <span class="text-gray-400">{tag}</span>
                {/if}
                {#if cost}
                    <div class="mx-1">
                        <Icon kind="sparkle" color="bg-gray-400" />
                    </div>
                    <span class="text-amber-600">${cost}</span>
                {/if}
            </div>
            <Rich text={description} />
        </div>
    </div>
</div>
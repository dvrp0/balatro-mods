<script lang="ts">
    import { _ } from "svelte-i18n";
    import { fade } from "svelte/transition";
    import Icon from "$components/Icon.svelte";
    import Rich from "$components/Rich.svelte";

    export let name: string;
    export let type: string;
    export let tag: string | undefined = undefined;
    export let cost: number | undefined = undefined;
    export let description: string;
    export let image: string | string[];
    export let smallImage = false;
    export let imageCycleFlag: number | undefined = undefined;
    export let spoiler = false;

    let imageIndex = 0;
    let reveal = false;

    $: imageCycleFlag, imageIndex = (imageIndex + 1) % image.length;
</script>

<div class="relative flex flex-col" role="tooltip" on:mouseenter={() => reveal = true} on:mouseleave={() => reveal = false}>
    {#if spoiler && !reveal}
        <div class="absolute z-10 text-center text-black -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 blur-0"
            transition:fade={{ duration: 150 }}>
            <Rich text={$_("misc.spoiler")} />
        </div>
    {/if}
    <div class="flex items-center bg-gray-100 rounded-xl w-full p-6 transition-all duration-300 {spoiler ? "blur-md hover:blur-0" : ""}">
        {#if image instanceof Array}
            <div class="flex-[30%] grid">
                {#key imageCycleFlag}
                    <img in:fade={{ duration: 250 }} out:fade={{ delay: 250, duration: 250 }} class="row-span-full col-span-full {smallImage ? "object-none": ""}"
                        src={image[imageIndex]} alt={name} loading="lazy" />
                {/key}
            </div>
        {:else}
            <img class="flex-[30%] {smallImage ? "object-none": ""}" src={image} alt={name} loading="lazy" />
        {/if}
        <div class="ml-4 flex flex-col flex-[100%]">
            <span class="font-bold">{name}</span>
            <div class="flex flex-wrap items-center mb-4">
                <span class="text-gray-400">{type}</span>
                {#if tag}
                    <div class="mx-1">
                        <Icon kind="sparkle" color="bg-gray-400" />
                    </div>
                    <Rich text="<in>{tag}</>" />
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
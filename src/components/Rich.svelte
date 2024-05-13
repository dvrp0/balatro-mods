<script lang="ts">
    export let text: string;

    const parsed = text
        .replace(/<at>/g, "<span class='text-amber-600 font-bold'>")
        .replace(/<ed>/g, "<span class='text-indigo-500 font-bold'>")
        .replace(/<mult>/g, "<span class='text-red-600 font-bold'>")
        .replace(/<xmult>/g, "<span class='bg-red-600 p-0.5 px-1.5 rounded-md text-white font-bold'>")
        .replace(/<chip>/g, "<span class='text-sky-600 font-bold'>")
        .replace(/<gr>/g, "<span class='text-green-600 font-bold'>")
        .replace(/<tr>/g, "<span class='text-purple-600 font-bold'>")
        .replace(/<pl>/g, "<span class='text-cyan-500 font-bold'>")
        .replace(/<sp>/g, "<span class='text-blue-500 font-bold'>")
        .replace(/<cine>/g, "<span class='text-cine-500 font-bold'>")
        .replace(/<alc>/g, "<span class='text-alchemy-500 font-bold'>")
        .replace(/<s>/g, "<span class='text-sm'>")
        .replace(/<in>/g, "<span class='text-gray-400'>")
        .replace(/<xin>/g, "<span class='bg-gray-400 p-0.5 px-1.5 rounded-md text-white break-all'>")
        .replace(/<cinein>/g, "<span class='bg-cine-300 p-0.5 px-1.5 rounded-md text-white break-all'>")
        .replace(/<c>/g, "<span class='font-mono text-sm whitespace-pre-wrap'>")
        .replace(/<\/>/g, "</span>");
</script>

<span>{@html parsed}</span>
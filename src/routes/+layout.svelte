<script>
    import { page } from "$app/stores";
    import "../app.pcss";

    $: titleColour = $page.route.id == "/" ? "text-gray-900" : "text-gray-400";
</script>

<main class="mx-auto max-w-[692px] px-6 antialiased my-16">
    <div class="flex flex-col">
        <a class="font-bold {titleColour}" href="/">DVRP's Balatro Mods</a>
        <slot />
    </div>
</main>
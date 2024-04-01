<script lang="ts">
    import { MetaTags } from "svelte-meta-tags";
    import ModEntry from "$components/ModEntry.svelte";

    const title = "DVRP's Balatro Mods";
    const description = "A collection of my mods for the game Balatro.";
</script>

<MetaTags
    {title}
    {description}
    canonical="https://dvrp-balatro-mods.pages.dev"
    openGraph={{
        type: "website",
        siteName: "DVRP's Balatro Mods",
        url: "https://dvrp-balatro-mods.pages.dev",
        title,
        description,
        images: [
            {
                url: "/images/thumbnails/main-og.png"
            }
        ]
    }}
    additionalMetaTags={[
        {
            property: "author",
            content: "DVRP"
        },
        {
            property: "theme-color",
            content: "#ffffff"
        }
    ]}
/>

<div class="mt-16 grid grid-cols-1 gap-4">
    <ModEntry id="risk-of-jesters" image="/images/thumbnails/risk-of-jesters.png" title="Risk of Jesters"
        description="Adds a bunch of Risk-of-Rain-themed Jokers, Vouchers, and Blinds." />
</div>
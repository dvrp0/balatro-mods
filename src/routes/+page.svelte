<script lang="ts">
    import { _ } from "svelte-i18n";
    import { MetaTags } from "svelte-meta-tags";
    import ModEntry from "$components/ModEntry.svelte";

    const title = $_("meta.siteName");
    const description = $_("meta.description");
</script>

<MetaTags
    {title}
    {description}
    canonical="https://dvrp-balatro-mods.pages.dev"
    openGraph={{
        type: "website",
        siteName: $_("meta.siteName"),
        url: "https://dvrp-balatro-mods.pages.dev",
        title,
        description,
        images: [
            {
                url: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/main-og.png"
            }
        ]
    }}
    twitter={{
        handle: "@dvrp0_",
        cardType: "summary_large_image",
        title,
        description,
        image: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/main-og.png",
        imageAlt: $_("meta.siteName")
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
    <ModEntry id="properkorean" image="/images/thumbnails/properkorean.png" title={$_("kor.name")}
        description={$_("kor.description")} />
    <ModEntry id="risk-of-jesters" image="/images/thumbnails/risk-of-jesters.png" title={$_("ror.name")}
        description={$_("ror.description")} />
</div>
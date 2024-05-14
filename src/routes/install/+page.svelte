<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { MetaTags } from "svelte-meta-tags";
    import Comment from "$components/Comment.svelte";
    import IconList from "$components/IconList.svelte";

    const title = $_("install.title");
    const description = $_("install.description");
    const installScreenshots = Object.keys(import.meta.glob("/static/images/screenshots/install/*.webp", {
        eager: true
    }))
        .map(x => x.replace("/static", ""))
        .filter(x => !x.split("/")[4].includes($locale === "ko" ? "en" : "ko"))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
</script>

<MetaTags
    {title}
    {description}
    canonical="https://dvrp-balatro-mods.pages.dev/install"
    openGraph={{
        type: "website",
        siteName: $_("meta.siteName"),
        url: "https://dvrp-balatro-mods.pages.dev/install",
        title,
        description,
        images: [
            {
                url: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/install-og.png"
            }
        ]
    }}
    twitter={{
        handle: "@dvrp0_",
        cardType: "summary_large_image",
        title,
        description,
        image: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/install-og.png",
        imageAlt: $_("install.title")
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

<div class="flex">
    <span class="font-bold">{$_("install.name")}</span>
</div>
<div class="mt-4"></div>
<Comment>
    {$_("install.windows")}
</Comment>
<span class="font-bold mt-16 mb-4">{$_("install.lovely")}</span>
<IconList kind="sparkle" items={[
    `<img src="${installScreenshots[0]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("install.1"),
    `<img src="${installScreenshots[1]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    `<img src="${installScreenshots[2]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("install.2")
]} />
<span class="font-bold mt-16 mb-4">{$_("install.steamodded")}</span>
<IconList kind="sparkle" items={[
    `<img src="${installScreenshots[4]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("install.3"),
    `<img src="${installScreenshots[3]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("install.4"),
    `<img src="${installScreenshots[5]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    `<img src="${installScreenshots[6]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("install.5")
]} />
<span class="font-bold mt-16 mb-4">{$_("install.mod")}</span>
<IconList kind="sparkle" items={[
    `<img src="${installScreenshots[7]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    `<img src="${installScreenshots[8]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("install.6"),
    `<img src="${installScreenshots[9]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("install.7")
]} />
<span class="font-bold mt-16 mb-4">{$_("install.trouble")}</span>
<IconList kind="sparkle" items={[
    `<img src="${installScreenshots[10]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    `<img src="${installScreenshots[11]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("install.trouble-1")
]} />
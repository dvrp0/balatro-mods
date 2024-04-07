<script lang="ts">
    import { onMount } from "svelte";
    import { _ } from "svelte-i18n";
    import { MetaTags } from "svelte-meta-tags";
    import { GITHUB_RELEASE_API_URL, GITHUB_RELEASE_DOWNLOAD_URL } from "$lib/const";
    import { latest } from "$lib/store";
    import Comment from "$components/Comment.svelte";
    import Icon from "$components/Icon.svelte";
    import IconList from "$components/IconList.svelte";
    import Rich from "$components/Rich.svelte";

    const title = $_("kor.title");
    const description = $_("kor.description");
    const installScreenshots = Object.keys(import.meta.glob("/static/images/screenshots/properkorean/install/*.webp", {
        eager: true
    })).map(x => x.replace("/static", ""));
    const screenshots = Object.keys(import.meta.glob("/static/images/screenshots/properkorean/*.webp", {
        eager: true
    })).map(x => x.replace("/static", ""));

    let tag = $latest?.["properkorean"] ?? undefined;

    onMount(async () => {
        const response = await fetch(GITHUB_RELEASE_API_URL.replace("{repo}", "ProperKorean-Balatro"))
            .then(result => result.json());

        tag = $latest["properkorean"] = response["tag_name"];
    });

    function download()
    {
        if (tag)
            window.open(GITHUB_RELEASE_DOWNLOAD_URL
                .replace("{repo}", "ProperKorean-Balatro")
                .replace("{tag}", tag)
                .replace("{filename}", "ProperKorean.zip"), "_blank");
    }
</script>

<MetaTags
    {title}
    {description}
    canonical="https://dvrp-balatro-mods.pages.dev/properkorean"
    openGraph={{
        type: "website",
        siteName: $_("meta.siteName"),
        url: "https://dvrp-balatro-mods.pages.dev/properkorean",
        title,
        description,
        images: [
            {
                url: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/properkorean-og.png"
            }
        ]
    }}
    twitter={{
        handle: "@dvrp0_",
        cardType: "summary_large_image",
        title,
        description,
        image: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/properkorean-og.png",
        imageAlt: $_("kor.title")
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
    <span class="font-bold">{$_("kor.name")}</span>
</div>
<div class="flex mt-4">
    <button on:click={download}>
        {#key tag}
            <Rich text={$_("misc.download", {
                values: {
                    version: `<c>${tag ?? '   ···'}</>`
                }
            })} />
        {/key}
    </button>
    <button class="fit ml-2 bg-gray-100 hover:bg-gray-200" on:click={() => window.open("https://github.com/dvrp0/ProperKorean-Balatro")}>
        <Icon kind="github" color="bg-gray-900" />
    </button>
</div>
<span class="mt-16">{$_("kor.intro")}</span>
<span class="font-bold mt-16 mb-4">{$_("misc.installation")}</span>
<Comment>
    <Rich text={$_("kor.install-comment-1")} />
    <div class="mb-4" />
    <Rich text={$_("kor.install-comment-2")} />
</Comment>
<div class="mb-4" />
<IconList kind="sparkle" items={[
    $_("kor.install-1"),
    `<img src="${installScreenshots[0]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("kor.install-2"),
    `<img src="${installScreenshots[1]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    `<img src="${installScreenshots[2]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("kor.install-3"),
    `<img src="${installScreenshots[3]}" alt="ProperKorean Screenshot" loading="lazy" />`,
    $_("kor.install-4"),
    $_("kor.install-5"),
    $_("kor.install-6")
]} />
<span class="font-bold mt-16 mb-4">{$_("kor.changes")}</span>
<IconList kind="sparkle" items={[
    $_("kor.changes-1"),
    $_("kor.changes-2"),
    $_("kor.changes-3"),
    $_("kor.changes-4"),
    $_("kor.changes-5"),
    $_("kor.changes-6"),
    $_("kor.changes-7"),
    $_("kor.changes-8")
]} />
<span class="font-bold mt-16 mb-4">{$_("misc.screenshots")}</span>
<div class="grid grid-cols-1 mt-4 gap-4 justify-items-center *:rounded-xl">
    {#each screenshots as src}
        <img {src} alt="ProperKorean Screenshot" loading="lazy" />
    {/each}
</div>
<span class="font-bold mt-16 mb-4">{$_("misc.changelog")}</span>
<IconList kind="sparkle" items={[
    `<xin><c>v0.4.0</></> : ${$_("kor.changelog.0-4-0")}`,
    `<xin><c>v0.3.22</></> : ${$_("kor.changelog.0-3-22")}`,
    `<xin><c>v0.3.0</></> : ${$_("kor.changelog.0-3-0")}`,
    `<xin><c>v0.2.0</></> : ${$_("kor.changelog.0-2-0")}`,
    `<xin><c>v0.1.0</></> : ${$_("kor.changelog.0-1-0")}`
]} />
<script lang="ts">
    import { onMount } from "svelte";
    import { _, json } from "svelte-i18n";
    import { MetaTags } from "svelte-meta-tags";
    import { GITHUB_RELEASE_API_URL, GITHUB_RELEASE_DOWNLOAD_URL } from "$lib/const";
    import { latest } from "$lib/store";
    import type { Changelog } from "$lib/types";
    import Comment from "$components/Comment.svelte";
    import Icon from "$components/Icon.svelte";
    import IconList from "$components/IconList.svelte";
    import LargeImageViewer from "$components/LargeImageViewer.svelte";
    import Rich from "$components/Rich.svelte";

    const title = $_("distro.title");
    const description = $_("distro.description");
    const screenshots = Object.keys(import.meta.glob("/static/images/screenshots/distro/*.*", {
        eager: true
    }))
        .map(x => x.replace("/static", ""))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const logo = Object.keys(import.meta.glob("/static/images/logos/distro/*.*", {
        eager: true
    }))
        .map(x => x.replace("/static", ""))[0];
    const changelog = $json("distro.changelog") as Changelog[];

    let tag = $latest?.["distro"] ?? undefined;
    let selectedImage: string | undefined = undefined;

    onMount(async () => {
        const response = await fetch(GITHUB_RELEASE_API_URL.replace("{repo}", "distro"))
            .then(result => result.json());

        tag = $latest["distro"] = response["tag_name"];
    });

    function download()
    {
        if (tag)
            window.open(GITHUB_RELEASE_DOWNLOAD_URL
                .replace("{repo}", "distro")
                .replace("{tag}", tag)
                .replace("{filename}", "distro.zip"), "_blank");
    }
</script>

<MetaTags
    {title}
    {description}
    canonical="https://dvrp-balatro-mods.pages.dev/distro"
    openGraph={{
        type: "website",
        siteName: $_("meta.siteName"),
        url: "https://dvrp-balatro-mods.pages.dev/distro",
        title,
        description,
        images: [
            {
                url: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/distro-og.png"
            }
        ]
    }}
    twitter={{
        handle: "@dvrp0_",
        cardType: "summary_large_image",
        title,
        description,
        image: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/distro-og.png",
        imageAlt: $_("distro.title")
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

<LargeImageViewer bind:src={selectedImage} />
<div class="flex">
    <span class="font-bold">{$_("distro.name")}</span>
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
    <button class="ml-2 bg-gray-100 fit hover:bg-gray-200" on:click={() => window.open("https://github.com/dvrp0/distro")}>
        <Icon kind="github" color="bg-gray-900" />
    </button>
</div>
<div class="mt-16 mx-auto w-full flex flex-col items-center">
    <img class="sm:w-[30%]" src={logo} alt="Distro Logo" loading="lazy" />
    <img class="mt-4 sm:w-[60%]" src={screenshots[0]} alt="Distro Screenshot" loading="lazy" on:click={() => {
        selectedImage = screenshots[0];
    }} />
</div>
<span class="mt-16">{$_("distro.intro")}</span>
<span class="mt-16 mb-4 font-bold">{$_("misc.installation")}</span>
<Comment>
    <Rich text={$_("misc.install-guide")} />
</Comment>
<div class="mb-4"></div>
<Comment>
    <Rich text={$_("distro.install-tip")} />
</Comment>
<div class="mb-4"></div>
<IconList kind="sparkle" items={[
    $_("distro.install-1"),
    $_("distro.install-2"),
    $_("distro.install-3"),
]} />
<span class="mt-16 mb-4 font-bold">{$_("distro.features")}</span>
<IconList kind="sparkle" items={[
    $_("distro.features-1"),
    $_("distro.features-2"),
    $_("distro.features-3"),
    $_("distro.features-4"),
    $_("distro.features-5")
]} />
<span class="mt-16 mb-4 font-bold">{$_("misc.changelog")}</span>
<IconList kind="sparkle" items={changelog.slice().reverse().map(x =>
    `<xin><c>v${x.version}</></><br>${x.text.split("|").join("<br>")}`
)} />
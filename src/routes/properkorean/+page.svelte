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
    import Rich from "$components/Rich.svelte";

    const title = $_("kor.title");
    const description = $_("kor.description");
    const installScreenshots = Object.keys(import.meta.glob("/static/images/screenshots/install/*.webp", {
        eager: true
    }))
        .map(x => x.replace("/static", ""))
        .filter(x => !x.split("/")[4].includes("en"))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const screenshots = Object.keys(import.meta.glob("/static/images/screenshots/properkorean/*.webp", {
        eager: true
    })).map(x => x.replace("/static", ""));
    const changelog = $json("kor.changelog") as Changelog[];
    const beta: string | undefined = undefined

    onMount(async () => {
        const response = await fetch(GITHUB_RELEASE_API_URL.replace("{repo}", "ProperKorean-Balatro"))
            .then(result => result.json());

        $latest["properkorean"] = response["tag_name"];
    });

    function download(tag: string)
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
    <div class="flex flex-col {beta ? "w-full" : ""} sm:flex-row">
        <button class={beta ? "w-full px-0" : ""} on:click={() => download($latest["properkorean"])}>
            {#key $latest}
                <Rich text={$_("misc.download", {
                    values: {
                        version: `<c>${$latest["properkorean"] ?? '   ···'}</>`
                    }
                })} />
            {/key}
        </button>
        {#if beta}
            <button class="w-full px-0 mt-2 sm:mt-0 sm:ml-2 bg-orange-600 hover:bg-orange-500" on:click={() => download(beta)}>
                {#key $latest}
                    <Rich text={$_("misc.download", {
                        values: {
                            version: `<c>${beta ?? "   ···"}</>`
                        }
                    })} />
                {/key}
            </button>
        {/if}
    </div>
    <button class="fit ml-2 bg-gray-100 hover:bg-gray-200" on:click={() => window.open("https://github.com/dvrp0/ProperKorean-Balatro")}>
        <Icon kind="github" color="bg-gray-900" />
    </button>
</div>
<div class="mt-4" />
<span class="mt-16">{$_("kor.intro")}</span>
<span class="font-bold mt-16 mb-4">{$_("misc.installation")}</span>
<Comment>
    <Rich text={$_("kor.install-comment-1")} />
    <div class="mb-4" />
    <Rich text={$_("kor.install-comment-2")} />
</Comment>
<div class="mb-4" />
<IconList kind="sparkle" items={[
    `img::${installScreenshots[0]}`,
    $_("install.1"),
    `img::${installScreenshots[1]}`,
    `img::${installScreenshots[2]}`,
    $_("install.2"),
    `img::${installScreenshots[3]}`,
    $_("install.4"),
    $_("kor.install-1"),
    $_("kor.install-2"),
    `img::${installScreenshots[9]}`,
    $_("install.7")
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
<span class="mt-16 mb-4 font-bold">{$_("misc.changelog")}</span>
<IconList kind="sparkle" items={changelog.slice().reverse().map(x =>
    `<xin><c>v${x.version}</></><br>${x.text.split("|").join("<br>")}`
)} />
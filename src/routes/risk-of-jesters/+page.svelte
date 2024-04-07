<script lang="ts">
    import { onMount } from "svelte";
    import { _ } from "svelte-i18n";
    import { MetaTags } from "svelte-meta-tags";
    import { GITHUB_RELEASE_API_URL, GITHUB_RELEASE_DOWNLOAD_URL } from "$lib/const";
    import { latest } from "$lib/store";
    import ContentEntry from "$components/ContentEntry.svelte";
    import Icon from "$components/Icon.svelte";
    import IconList from "$components/IconList.svelte";
    import Rich from "$components/Rich.svelte";

    const title = $_("ror.title");
    const description = $_("ror.description");
    const screenshots = Object.keys(import.meta.glob("/static/images/screenshots/risk-of-jesters/*.png", {
        eager: true
    })).map(x => x.replace("/static", ""));

    let tag = $latest?.["risk-of-jesters"] ?? undefined;

    onMount(async () => {
        const response = await fetch(GITHUB_RELEASE_API_URL.replace("{repo}", "risk-of-jesters"))
            .then(result => result.json());

        $latest["risk-of-jesters"] = response["tag_name"];
        tag = response["tag_name"];
    });

    function download()
    {
        if (tag)
            window.open(GITHUB_RELEASE_DOWNLOAD_URL
                .replace("{repo}", "risk-of-jesters")
                .replace("{tag}", tag)
                .replace("{filename}", "RiskofJesters.zip"), "_blank");
    }
</script>

<MetaTags
    {title}
    {description}
    canonical="https://dvrp-balatro-mods.pages.dev/risk-of-jesters"
    openGraph={{
        type: "website",
        siteName: $_("meta.siteName"),
        url: "https://dvrp-balatro-mods.pages.dev/risk-of-jesters",
        title,
        description,
        images: [
            {
                url: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/risk-of-jesters-og.png"
            }
        ]
    }}
    twitter={{
        handle: "@dvrp0_",
        cardType: "summary_large_image",
        title,
        description,
        image: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/risk-of-jesters-og.png",
        imageAlt: $_("ror.title")
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
    <span class="font-bold">{$_("ror.name")}</span>
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
    <button class="fit ml-2 bg-gray-200 hover:bg-gray-300" on:click={() => window.open("https://github.com/dvrp0/risk-of-jesters")}>
        <Icon kind="github" color="bg-gray-900" />
    </button>
</div>
<span class="mt-16">{$_("ror.intro")}</span>
<span class="font-bold mt-16 mb-4">{$_("misc.installation")}</span>
<IconList kind="sparkle" items={[
    $_("ror.install-1"),
    $_("ror.install-2"),
    $_("ror.install-3"),
]} />
<span class="font-bold mt-16 mb-4">{$_("misc.languages")}</span>
<span class="mb-4">{$_("ror.languages.description")}</span>
<IconList kind="sparkle" items={[
    $_("ror.languages.en"),
    $_("ror.languages.ko"),
    $_("ror.languages.ru"),
]} />
<span class="font-bold mt-16 mb-4">{$_("misc.contents")}</span>
<span>{$_("ror.contents", {
    values: {
        jokers: 10,
        vouchers: 2,
        blinds: 4
    }
})}</span>
<div class="grid grid-cols-1 mt-4 gap-4">
    <ContentEntry name={$_("ror.bungus.name")} type={$_("misc.commonJoker")} cost={6} image="/images/jokers/j_bungus.png"
        description={$_("ror.bungus.description")} />
    <ContentEntry name={$_("ror.snake_eyes.name")} type={$_("misc.commonJoker")} cost={5} image="/images/jokers/j_snake_eyes.png"
        description={$_("ror.snake_eyes.description")} />
    <ContentEntry name={$_("ror.daisy.name")} type={$_("misc.uncommonJoker")} cost={6} image="/images/jokers/j_daisy.png"
        description={$_("ror.daisy.description")} />
    <ContentEntry name={$_("ror.kjaro.name")} type={$_("misc.uncommonJoker")} cost={5} image="/images/jokers/j_kjaro.png"
        description={$_("ror.kjaro.description")} />
    <ContentEntry name={$_("ror.duplicator.name")} type={$_("misc.rareJoker")} cost={10} image="/images/jokers/j_duplicator.png"
        description={$_("ror.duplicator.description")} />
    <ContentEntry name={$_("ror.happiest.name")} type={$_("misc.rareJoker")} cost={9} image="/images/jokers/j_happiest_mask.png"
        description={$_("ror.happiest.description")} />
    <ContentEntry name={$_("ror.benthic.name")} type={$_("misc.rareJoker")} cost={8} image="/images/jokers/j_benthic.png"
        description={$_("ror.benthic.description")} />
    <ContentEntry name={$_("ror.encrusted.name")} type={$_("misc.commonJoker")} cost={5} image="/images/jokers/j_encrusted.png"
        description={$_("ror.encrusted.description")} />
    <ContentEntry name={$_("ror.egocentrism.name")} type={$_("misc.commonJoker")} cost={4} image="/images/jokers/j_egocentrism.png"
        description={$_("ror.egocentrism.description")} />
    <ContentEntry name={$_("ror.eulogy.name")} type={$_("misc.uncommonJoker")} cost={5} image="/images/jokers/j_eulogy.png"
        description={$_("ror.eulogy.description")} />
</div>
<div class="grid grid-cols-1 mt-16 gap-4">
    <ContentEntry name={$_("ror.3d.name")} type={$_("misc.voucher")} cost={10} image="/images/vouchers/v_3d_printer.png"
        description={$_("ror.3d.description")} />
    <ContentEntry name={$_("ror.mili.name")} type={$_("misc.upgradedVoucher")} cost={10} image="/images/vouchers/v_militech_printer.png"
        description={$_("ror.mili.description")} />
</div>
<div class="grid grid-cols-1 mt-16 gap-4">
    <ContentEntry name={$_("ror.loop.name")} type={$_("misc.bossBlind")} tag={$_("misc.bossAppear", {
        values: {
            ante: 1
        }
    })} image="/images/blinds/bl_loop.png"
        description={$_("ror.loop.description")} />
    <ContentEntry name={$_("ror.void.name")} type={$_("misc.bossBlind")} tag={$_("misc.bossAppear", {
        values: {
            ante: 1
        }
    })} image="/images/blinds/bl_void.png"
        description={$_("ror.void.description")} />
    <ContentEntry name={$_("ror.hammer.name")} type={$_("misc.finalBlind")} image="/images/blinds/bl_final_hammer.png"
        description={$_("ror.hammer.description")} />
    <ContentEntry name={$_("ror.crab.name")} type={$_("misc.finalBlind")} image="/images/blinds/bl_final_crab.png"
        description={$_("ror.crab.description")} />
</div>
<span class="font-bold mt-16 mb-4">{$_("misc.screenshots")}</span>
<div class="grid grid-cols-1 mt-4 gap-4 *:rounded-xl">
    {#each screenshots as src}
        <img {src} alt="Risk of Jesters Screenshot" loading="lazy" />
    {/each}
</div>
<span class="font-bold mt-16 mb-4">{$_("misc.changelog")}</span>
<IconList kind="sparkle" items={[
    `<xin><c>v0.1.1</></> : ${$_("ror.changelog.0-1-1")}`,
    `<xin><c>v0.1.0</></> : ${$_("ror.changelog.0-1-0")}`
]} />
<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { quartOut } from "svelte/easing";
    import { _, json } from "svelte-i18n";
    import { MetaTags } from "svelte-meta-tags";
    import { beforeNavigate } from "$app/navigation";
    import { GITHUB_RELEASE_API_URL, GITHUB_RELEASE_DOWNLOAD_URL } from "$lib/const";
    import { latest } from "$lib/store";
    import type { Changelog } from "$lib/types";
    import ContentEntry from "$components/ContentEntry.svelte";
    import Comment from "$components/Comment.svelte";
    import Icon from "$components/Icon.svelte";
    import IconList from "$components/IconList.svelte";
    import LargeImageViewer from "$components/LargeImageViewer.svelte";
    import Rich from "$components/Rich.svelte";

    const title = $_("reverie.title");
    const description = $_("reverie.description");
    const screenshots = Object.keys(import.meta.glob("/static/images/screenshots/reverie/*.*", {
        eager: true
    }))
        .map(x => x.replace("/static", ""))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const logos = Object.keys(import.meta.glob("/static/images/logos/reverie/*.*", {
        eager: true
    }))
        .map(x => x.replace("/static", ""))
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    const changelog = ($json("reverie.changelog") as Changelog[]).reverse();

    let tag = $latest?.["reverie"] ?? undefined;
    let selectedImage: string | undefined = undefined;
    let imageCycleFlag = 1;
    let imageCycleInterval = setInterval(() => {
        imageCycleFlag *= -1;
    }, 5000);
    let logoIndex = logos.length - 1; // index will be immediately incremented by 1 because of the below line

    $: imageCycleFlag, logoIndex = (logoIndex + 1) % logos.length;

    onMount(async () => {
        const response = await fetch(GITHUB_RELEASE_API_URL.replace("{repo}", "reverie"))
            .then(result => result.json());

        tag = $latest["reverie"] = response["tag_name"];
    });

    beforeNavigate(() => {
        clearInterval(imageCycleInterval);
    });

    function download()
    {
        if (tag)
            window.open(GITHUB_RELEASE_DOWNLOAD_URL
                .replace("{repo}", "reverie")
                .replace("{tag}", tag)
                .replace("{filename}", "Reverie.zip"), "_blank");
    }
</script>

<MetaTags
    {title}
    {description}
    canonical="https://dvrp-balatro-mods.pages.dev/reverie"
    openGraph={{
        type: "website",
        siteName: $_("meta.siteName"),
        url: "https://dvrp-balatro-mods.pages.dev/reverie",
        title,
        description,
        images: [
            {
                url: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/reverie-og.png"
            }
        ]
    }}
    twitter={{
        handle: "@dvrp0_",
        cardType: "summary_large_image",
        title,
        description,
        image: "https://dvrp-balatro-mods.pages.dev/images/thumbnails/reverie-og.png",
        imageAlt: $_("reverie.title")
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
    <span class="font-bold">{$_("reverie.name")}</span>
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
    <button class="ml-2 bg-gray-100 fit hover:bg-gray-200" on:click={() => window.open("https://github.com/dvrp0/reverie")}>
        <Icon kind="github" color="bg-gray-900" />
    </button>
</div>
<div class="mt-16 mx-auto grid sm:w-[70%]">
    {#key imageCycleFlag}
        <img in:fly={{ delay: 500, x: -20, duration: 1000, easing: quartOut }} out:fly={{ x: 20, duration: 1000, easing: quartOut }} class="row-span-full col-span-full"
            src={logos[logoIndex]} alt="Reverie Logo" loading="lazy" />
    {/key}
</div>
<span class="mt-16">{$_("reverie.intro-1")}</span>
<span class="mt-4">{$_("reverie.intro-2")}</span>
<span class="mt-16 mb-4 font-bold">{$_("misc.installation")}</span>
<Comment>
    <Rich text={$_("misc.install-guide")} />
</Comment>
<div class="mb-4"></div>
<IconList kind="sparkle" items={[
    $_("reverie.install-1"),
    $_("reverie.install-2"),
    $_("reverie.install-3"),
]} />
<span class="mt-16 mb-4 font-bold">{$_("misc.languages")}</span>
<span class="mb-4">{$_("reverie.languages.description")}</span>
<IconList kind="sparkle" items={[
    $_("reverie.languages.en"),
    $_("reverie.languages.ko")
]} />
<span class="mt-16 mb-4 font-bold">{$_("misc.contents")}</span>
<div class="grid gap-y-4">
    <Rich text={$_("reverie.contents", {
        values: {
            cines: 13,
            spectrals: 1,
            jokers: 1,
            vouchers: 2,
            backs: 2,
            boosters: 9,
            tags: 2
        }
    })} />
    <Rich text={$_("reverie.cines-1")} />
    <img class="w-full mx-auto rounded-xl sm:w-auto" src={screenshots[0]} alt="Reverie Screenshot" loading="lazy" />
    <span>{$_("reverie.cines-2")}</span>
    <Rich text={$_("reverie.cines-3")} />
    <Rich text={$_("reverie.cines-4")} />
</div>
<div class="grid grid-cols-1 gap-4 mt-4">
    <ContentEntry name={$_("reverie.gem-heist.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_gem_heist_quest.png",
            "/images/consumables/c_gem_heist.png",
        ]} description={$_("reverie.gem-heist.description")} />
    <ContentEntry name={$_("reverie.tag-or-die.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_tag_or_die_quest.png",
            "/images/consumables/c_tag_or_die.png",
        ]} description={$_("reverie.tag-or-die.description")} />
    <ContentEntry name={$_("reverie.eerie-inn.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_eerie_inn_quest.png",
            "/images/consumables/c_eerie_inn.png",
        ]} description={$_("reverie.eerie-inn.description")} />
    <ContentEntry name={$_("reverie.let-it-moon.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_let_it_moon_quest.png",
            "/images/consumables/c_let_it_moon.png",
        ]} description={$_("reverie.let-it-moon.description")} />
    <ContentEntry name={$_("reverie.poker-face.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_poker_face_quest.png",
            "/images/consumables/c_poker_face.png",
        ]} description={$_("reverie.poker-face.description")} />
    <ContentEntry name={$_("reverie.crazy-lucky.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_crazy_lucky_quest.png",
            "/images/consumables/c_crazy_lucky.png",
        ]} description={$_("reverie.crazy-lucky.description")} />
    <ContentEntry name={$_("reverie.adrifting.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_adrifting_quest.png",
            "/images/consumables/c_adrifting.png",
        ]} description={$_("reverie.adrifting.description")} />
    <ContentEntry name={$_("reverie.morsel.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_morsel_quest.png",
            "/images/consumables/c_morsel.png",
        ]} description={$_("reverie.morsel.description")} />
    <ContentEntry name={$_("reverie.unseen.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_unseen_quest.png",
            "/images/consumables/c_unseen.png",
        ]} description={$_("reverie.unseen.description")} />
    <ContentEntry name={$_("reverie.ive-no-shape.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_ive_no_shape_quest.png",
            "/images/consumables/c_ive_no_shape.png",
        ]} description={$_("reverie.ive-no-shape.description")} />
    <ContentEntry name={$_("reverie.alchemist.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_alchemist_quest.png",
            "/images/consumables/c_alchemist.png",
        ]} description={$_("reverie.alchemist.description")} tag={$_("reverie.alchemist.requires")} />
    <ContentEntry name={$_("reverie.every-hue.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_every_hue_quest.png",
            "/images/consumables/c_every_hue.png",
        ]} description={$_("reverie.every-hue.description")} tag={$_("reverie.every-hue.requires")} />
    <ContentEntry name={$_("reverie.radioactive.name")} type={$_("misc.cine")} {imageCycleFlag} image={[
            "/images/consumables/c_radioactive_quest.png",
            "/images/consumables/c_radioactive.png",
        ]} description={$_("reverie.radioactive.description")} tag={$_("reverie.radioactive.requires")} />
</div>
<div class="grid grid-cols-1 gap-4 mt-16">
    <ContentEntry name={$_("reverie.reverie.name")} type={$_("misc.spectral")} image="/images/consumables/c_reverie.png"
        description={$_("reverie.reverie.description")} spoiler />
</div>
<div class="grid grid-cols-1 gap-4 mt-16">
    <ContentEntry name={$_("reverie.filmstrip.name")} type={$_("misc.back")} image="/images/backs/b_filmstrip.png"
        description={$_("reverie.filmstrip.description")} />
    <ContentEntry name={$_("reverie.stamp.name")} type={$_("misc.back")} image="/images/backs/b_stamp.png"
        description={$_("reverie.stamp.description")} />
</div>
<div class="grid grid-cols-1 gap-4 mt-16">
    <ContentEntry name={$_("reverie.dynamic-film.name")} type={$_("misc.commonJoker")} cost={4} image="/images/jokers/j_dynamic_film.png"
        description={$_("reverie.dynamic-film.description")} />
</div>
<div class="grid grid-cols-1 gap-4 mt-16">
    <ContentEntry name={$_("reverie.script.name")} type={$_("misc.voucher")} cost={10} image="/images/vouchers/v_script.png"
        description={$_("reverie.script.description")} />
    <ContentEntry name={$_("reverie.megaphone.name")} type={$_("misc.upgradedVoucher")} cost={10} image="/images/vouchers/v_megaphone.png"
        description={$_("reverie.megaphone.description")} />
</div>
<div class="grid grid-cols-1 gap-4 mt-16">
    <ContentEntry name={$_("reverie.tag-pack-normal.name")} type={$_("misc.pack")} cost={4} {imageCycleFlag} image={[
            "/images/boosters/p_tag_normal_1.png",
            "/images/boosters/p_tag_normal_2.png"
        ]} description={$_("reverie.tag-pack-normal.description")} />
    <ContentEntry name={$_("reverie.tag-pack-jumbo.name")} type={$_("misc.pack")} cost={6} image="/images/boosters/p_tag_jumbo_1.png"
        description={$_("reverie.tag-pack-jumbo.description")} />
    <ContentEntry name={$_("reverie.tag-pack-mega.name")} type={$_("misc.pack")} cost={8} image="/images/boosters/p_tag_mega_1.png"
        description={$_("reverie.tag-pack-mega.description")} />
    <ContentEntry name={$_("reverie.film-pack-normal.name")} type={$_("misc.pack")} cost={4} {imageCycleFlag} image={[
            "/images/boosters/p_film_normal_1.png",
            "/images/boosters/p_film_normal_2.png"
        ]} description={$_("reverie.film-pack-normal.description")} />
    <ContentEntry name={$_("reverie.film-pack-jumbo.name")} type={$_("misc.pack")} cost={6} image="/images/boosters/p_film_jumbo_1.png"
        description={$_("reverie.film-pack-jumbo.description")} />
    <ContentEntry name={$_("reverie.film-pack-mega.name")} type={$_("misc.pack")} cost={8} image="/images/boosters/p_film_mega_1.png"
        description={$_("reverie.film-pack-mega.description")} />
    <ContentEntry name={$_("reverie.pack-normal.name")} type={$_("misc.pack")} cost={6} image="/images/boosters/p_crazy_lucky_1.png"
        description={$_("reverie.pack-normal.description")} />
</div>
<div class="grid grid-cols-1 gap-4 mt-16">
    <ContentEntry name={$_("reverie.stub-tag.name")} type={$_("misc.tag")} image="/images/tags/tag_cine.png" smallImage
        description={$_("reverie.stub-tag.description")} />
    <ContentEntry name={$_("reverie.stamp-tag.name")} type={$_("misc.tag")} image="/images/tags/tag_mega_tag.png" smallImage
        description={$_("reverie.stamp-tag.description")} />
</div>
<span class="mt-16 mb-4 font-bold">{$_("misc.screenshots")}</span>
<div class="grid grid-cols-1 mt-4 gap-4 *:rounded-xl">
    {#each screenshots.slice(1) as src}
        <img {src} alt="Reverie Screenshot" loading="lazy" on:click={() => {
            selectedImage = src;
        }} />
    {/each}
</div>
<span class="mt-16 mb-4 font-bold">{$_("misc.changelog")}</span>
<IconList kind="sparkle" items={changelog.map(x =>
    `<xin><c>v${x.version}</></><br>${x.text.split("|").join("<br>")}`
)} />
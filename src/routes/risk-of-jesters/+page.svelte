<script lang="ts">
    import { onMount } from "svelte";
    import { GITHUB_RELEASE_API_URL, GITHUB_RELEASE_DOWNLOAD_URL } from "$lib/const";
    import { latest } from "$lib/store";
    import ContentEntry from "$components/ContentEntry.svelte";
    import IconList from "$components/IconList.svelte";

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

<div class="flex">
    <span class="font-bold">Risk of Jesters</span>
</div>
<button class="mt-4" on:click={download}>
    Download
    {#if !tag}
        ···
    {:else}
        {tag}
    {/if}
</button>
<span class="mt-16">
    New Jokers, Vouchers, and Blinds themed with the Risk of Rain franchise make their entrance, yet still retaining the feeling of vanilla Balatro.
    The volume is not that big yet, but you can expect more to come as new DLC for Risk of Rain 2 is approaching...
</span>
<span class="font-bold mt-16 mb-4">Installation</span>
<IconList kind="sparkle" items={[
    `Install
    <a href="https://github.com/Steamopollys/Steamodded/releases" target="_blank">Steamodded</a>
    and
    <a href="https://github.com/ethangreen-dev/lovely-injector/releases" target="_blank">Lovely</a>.`,
    `Download the mod and unzip it.`,
    `Put <xin><c>RiskofJesters</></> folder into <xin><c>C:\\Users\\(USER)\\AppData\\Roaming\\Balatro\\Mods</></>. Create the <xin><c>Mods</></> folder if it doesn't exist.`,
]} />
<span class="font-bold mt-16 mb-4">Contents</span>
<span>
    Current version has 10 Jokers, 2 Vouchers, and 4 Blinds. You can check the full list below.
</span>
<div class="grid grid-cols-1 mt-4 gap-4">
    <ContentEntry name="Bustling Fungus" type="Common Joker" cost={6} image="/images/jokers/j_bungus.png"
        description="After <at>5</> rounds, add <ed>Foil</> to base edition Jokers on both sides<br>
            <in>(Currently <at>0</>/5)</>" />
    <ContentEntry name="Snake Eyes" type="Common Joker" cost={5} image="/images/jokers/j_snake_eyes.png"
        description="Gains <mult>+6</> Mult if <tr>The Wheel of Fortune</> fails<br>
            <in>(Currently <mult>+2</> Mult)</>" />
    <ContentEntry name="Lepton Daisy" type="Uncommon Joker" cost={6} image="/images/jokers/j_daisy.png"
        description="<chip>+50</> Chips for each <at>debuffed</> card in played hand" />
    <ContentEntry name="Kjaro's Band" type="Uncommon Joker" cost={5} image="/images/jokers/j_kjaro.png"
        description="<xmult>X4</> Mult if Chips scored in last round were more than <at>X4</> of required Chips" />
    <ContentEntry name="Substandard Duplicator" type="Rare Joker" cost={10} image="/images/jokers/j_duplicator.png"
        description="When gain a <at>Joker</>, create a <ed>Negative Temporary</> copy of it<br>
            <xin>Temporary</><in> : Gets destroyed at end of round and has no sell value</>" />
    <ContentEntry name="Happiest Mask" type="Rare Joker" cost={9} image="/images/jokers/j_happiest_mask.png"
        description="<gr>1 in 2</> chance to create a random <sp>Spectral</> card when any card is destroyed<br>
            <in>(Must have room)</>" />
    <ContentEntry name="Benthic Bloom" type="Rare Joker" cost={8} image="/images/jokers/j_benthic.png"
        description="Upgrade <at>1</> random <at>Joker</> into <at>Joker</> of the next <at>higher rarity</> when <at>Boss Blind</> is defeated" />
    <ContentEntry name="Encrusted Key" type="Common Joker" cost={5} image="/images/jokers/j_encrusted.png"
        description="After defeating the <at>Boss Blind</>, this card is destroyed and gain a <at>Coupon Tag</>" />
    <ContentEntry name="Egocentrism" type="Common Joker" cost={4} image="/images/jokers/j_egocentrism.png"
        description="<chip>+40</> Chips for each <at>Egocentrism</>. Convert a random <at>Joker</> into <at>Egocentrism</> when <at>Blind</> is selected<br>
            <in>(Currently <chip>+40</> Chips)</>" />
    <ContentEntry name="Eulogy Zero" type="Uncommon Joker" cost={5} image="/images/jokers/j_eulogy.png"
        description="<at>Shop</> cards have <gr>1 in 4</> chance of being <at>half price</> and <at>flipped</>" />
</div>
<div class="grid grid-cols-1 mt-16 gap-4">
    <ContentEntry name="3D Printer" type="Voucher" cost={10} image="/images/vouchers/v_3d_printer.png"
        description="All <at>Booster Packs</> have <at>1</> more option" />
    <ContentEntry name="Mili-Tech Printer" type="Upgraded Voucher" cost={10} image="/images/vouchers/v_militech_printer.png"
        description="Can choose <at>1</> more card from all <at>Booster Packs</>" />
</div>
<div class="grid grid-cols-1 mt-16 gap-4">
    <ContentEntry name="The Loop" type="Boss Blind" tag="Appear from Ante 1" image="/images/blinds/bl_loop.png"
        description="Random Joker disabled after playing 2 hands" />
    <ContentEntry name="The Void" type="Boss Blind" tag="Appear from Ante 1" image="/images/blinds/bl_void.png"
        description="Set all Jokers' sell value to 0 when defeated" />
    <ContentEntry name="Glaucous Hammer" type="Final Boss Blind" image="/images/blinds/bl_final_hammer.png"
        description="Start with random half of the deck debuffed" />
    <ContentEntry name="Tyrian Crab" type="Final Boss Blind" image="/images/blinds/bl_final_crab.png"
        description="X1.5 required Chips after each hand played" />
</div>
<span class="font-bold mt-16 mb-4">Screenshots</span>
<div class="grid grid-cols-1 mt-4 gap-4 *:rounded-xl">
    <img src="/images/screenshots/risk-of-jesters/1.png" alt="Risk of Jesters Screenshot 1" />
    <img src="/images/screenshots/risk-of-jesters/2.png" alt="Risk of Jesters Screenshot 2" />
    <img src="/images/screenshots/risk-of-jesters/3.png" alt="Risk of Jesters Screenshot 3" />
    <img src="/images/screenshots/risk-of-jesters/4.png" alt="Risk of Jesters Screenshot 4" />
    <img src="/images/screenshots/risk-of-jesters/5.png" alt="Risk of Jesters Screenshot 5" />
</div>
<span class="font-bold mt-16 mb-4">Changelog</span>
<IconList kind="sparkle" items={[
    `<xin><c>v0.1.0</></> : Mod released.`
]} />
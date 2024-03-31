<script lang="ts">
    export let kind: string;
    export let big = false;
    export let color = "bg-gray-900";

    let src = `/images/icons/${kind}.svg`;
</script>

<div class="{big ? "w-[40px] h-[40px]" : "w-[20px] h-[20px]"} {color}"
    style="--src: url({src});">
    <img class="opacity-0" {src} alt="Icon" />
</div>

<style>
    div {
        -webkit-mask: var(--src) no-repeat center;
        mask: var(--src) no-repeat center;
    }
</style>
<script lang="ts">
    export let id: string;
    export let title: string;
    export let description: string;
    export let image: string;
</script>

<a href="/{id}">
    <div class="flex bg-blend-darken rounded-xl w-full h-48 p-6 transition-all duration-300
        hover:shadow-2xl hover:shadow-gray-200 hover:-translate-y-3"
        style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.85)), url({image})
        no-repeat center; background-size: cover;">
        <div class="flex flex-col self-end text-white">
            <span class="font-bold">{title}</span>
            <span>{description}</span>
        </div>
    </div>
</a>
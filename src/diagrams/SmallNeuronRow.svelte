<script>
    import { each } from 'svelte/internal';
    import NeuronCard from '../components/NeuronCard.svelte';
    import NeuronCardInfo from '../components/NeuronCardInfo.svelte';
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
    let strength = 4;
    export let neurons = [];
    export let facet = "any";
    $: console.log("neurons", neurons);
</script>

<div style='display: flex; flex-direction: row; gap: 16px;'>
    {#each neurons as neuron}
    <NeuronCard neuron={neuron} facets={[facet]} ds={false} />
    {/each}
</div>
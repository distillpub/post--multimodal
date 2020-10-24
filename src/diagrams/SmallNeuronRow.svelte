<script>
    import { each } from 'svelte/internal';
    import NeuronCard from '../components/NeuronCard.svelte';
    import NeuronCardInfo from '../components/NeuronCardInfo.svelte';
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
    export let neurons = [];
    export let facets = [];
</script>

<div style='display: flex; flex-direction: row; gap: 16px;'>
  {#each neurons as neuron, index}
    <NeuronCard neuron={neuron} facets={[facets[index]]} ds={false} />
  {/each}
</div>

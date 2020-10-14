<script>
    import { each } from 'svelte/internal';
    import NeuronCard from '../components/NeuronCard.svelte';
    import NeuronCardInfo from '../components/NeuronCardInfo.svelte';
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
    let strength = 4;
    export let facets = [];
    export let neurons = [];
    export let titles = [];
    export let models = [];
    export let layers = [];
    $: console.log("neurons", neurons);
</script>

<div style='display: flex; flex-direction: row; gap: 16px;'>
    {#each neurons as neuron, index}
      <div style='display: flex; flex-direction: column; gap: 6px; text-align: center; flex-basis: 0; flex-grow: 1;'>
        <h4>{titles[index]}</h4>
        <div style="display: inline-block; margin: auto;">
          <NeuronCard neuron={{model: models[index], unit: neuron, layer: layers[index]}} facets={facets} ds={false} />
        </div>
      </div>
    {/each}
</div>

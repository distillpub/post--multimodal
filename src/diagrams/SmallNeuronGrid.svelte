<script>
    import { each } from 'svelte/internal';
    import NeuronCard from '../components/NeuronCard.svelte';
    import NeuronCardInfo from '../components/NeuronCardInfo.svelte';
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
    export let neurons = [];
</script>

<div style='display: flex; flex-direction: row; gap: 1%; flex-wrap: wrap; margin: auto;'>
  {#each neurons as neuron}
    <div style='display: flex; flex-direction: column; gap: 6px; flex: 0 1 19%; text-align: center;'>
      <h4 style="margin: 10px 0 2px 0;">{neuron.title}</h4>
      <div style="display: inline-block; width: fit-content; margin: auto;">
      <NeuronCard neuron={{model: neuron.model, unit: neuron.unit, name: neuron.title}} facets={neuron.facets} ds={false} />
      </div>
      <div class="figcaption">
        <p>
          {neuron.model == "rn101" ? "RN101" : neuron.model == "4x" ? "RN50-4x" : neuron.model} neuron {neuron.unit}{neuron.facets[0] == "any" ? ", feature viz" : ", " + neuron.facets[0] + " facet"}.
        </p>
      </div>
    </div>
  {/each}
</div>

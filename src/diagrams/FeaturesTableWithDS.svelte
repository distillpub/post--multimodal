

<script>
    import NeuronCard from '../components/NeuronCard.svelte';
    import NeuronCardInfo from '../components/NeuronCardInfo.svelte';
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
    let models = [0,1,2,3];
    let neurons = [{model: "4x", unit: 89, name: "Donald Trump"}];
    let facets = ["face", "text"];
</script>


<style>
.container{
    width: fit-content;
    margin: auto;
    display: grid;
    grid-gap: 16px;
    --img-size: 100px;
    grid-template-columns: 
        [label] auto 8px
        [title-start caption-start] repeat(var(--n-models), [model] calc(2 * var(--img-size)))
        [title-end caption-end] 8px [extra-info] 200px;
    grid-template-rows: 
        [title] 1px [label] auto 
        repeat(var(--n-neurons), [neuron] calc(var(--n-facets) * var(--img-size))) 
        1px [caption] auto;
}
</style>


<div class='container' style='--n-models: {models.length}; --n-neurons: {neurons.length};  --n-facets: {facets.length}'>



{#each models as model, model_i} {#each neurons as neuron, neuron_i}
<div style='grid-row: neuron {neuron_i+1}; grid-column: model {model_i+1};'>
    <NeuronCard neuron={neuron} facets={facets} />
</div>
{/each} {/each}


{#each models as model, model_i}
<div style='grid-row: label; grid-column: model {model_i+1};'>
    Contrastive 4X
</div>
{/each}


{#each neurons as neuron, neuron_i}
<div style='grid-row: neuron {neuron_i+1}; grid-column: label;'>
    {neuron.name}
</div>
{/each}

<div class='figcaption' style='max-width: 400px; grid-area: caption;'>
    <a class='figure-anchor'>Figure N:</a>
    Lorem ipsum
</div>

<div style='grid-column: extra-info; grid-row: neuron 1 / span 2; width: 180px;'>
<NeuronCardInfo facets={facets} />
<div class='figcaption' style='margin-top: 8px;'>Faceted Feature Visualization and Dataset Examples</div>
</div>

</div>
<script>
    import {as_facet} from '../urls.js';
    export let img_size = 90;
    export let facets = ["any"];
    export let fv = true;
    export let ds = true;
    var display_types;
    $: {
        display_types=[]; 
        if (fv) display_types.push("Feature Visualization"); 
        if (ds) display_types.push("Dataset Examples");
    }
</script>


<style>
.neuron-card-info {
    --border-color: #CCC;
    width: calc(var(--n-display) * var(--img-size));
    height: calc(var(--n-facets) * var(--img-size));
    background: var(--border-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: grid;
    grid-gap: 0px;
    grid-gap: 1px;
    grid-template-columns: repeat(var(--n-display), [display] auto);
    grid-template-rows: repeat(var(--n-facets), [facet] auto);
    overflow: hidden;
}
.neuron-card-info>div {
    background: #EEE;
    border: none;
    width: calc(var(--img-size) - 8px);
    height: calc(var(--img-size) - 8px);
    padding: 4px;
}
</style>

<div class='neuron-card-info figcaption' style='--n-facets: {facets.length}; --n-display: {display_types.length}; --img-size: {img_size}px;'>
    {#each facets as facet, facet_i} {#each display_types as display_name, display_i}
    <div style='grid-row: facet {facet_i+1}; grid-column: [display] {display_i+1}; display: flex;' >
        <div style='width: fit-content; margin: auto; opacity: 0.8;'>
        {display_name}
        {(facet=="any") ? "" : as_facet(facet).name}
        </div>
    </div>
    {/each}{/each}
</div>


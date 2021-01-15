

<script>
    export let img_size = 100;
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
    export let neuron = {model: "4x", unit: 1, name: "Default"};
    export let facets = ["face", "text"];
    export let fv = true;
    export let ds = true;
    export let ds_override = false
    export let selectable = true
    var display_types;
    $: {
        display_types=[]; 
        if (fv) display_types.push(facet_icon_url); 
        if (ds) display_types.push(ds_override ? function(neuron, facet) { return dataset_examples_url(neuron, "any") }: dataset_examples_url);
    }
    let current_facet = facets[0]
</script>


<style>

.neuron-card {
    --img-size: 100;
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
    position: relative;
}
/* .neuron-card,  */
.neuron-card>img {
    background: #EEE;
    border: none;
    width: var(--img-size);
    height: var(--img-size);
}

.dropdown {
    opacity: 0;
}

.dropdown:hover {
    opacity: 0.8;
}
</style>
<div 
    class='neuron-card' 
    style='--n-facets: {facets.length}; --n-display: {display_types.length}; --img-size: {img_size}px;'>
    {#each facets as facet, facet_i} {#each display_types as display_url_f, display_i}
    <div class="dropdown" style="position: absolute; left: 3px; top:3px; height: 90px"> 
        {#if selectable}
        <select style="width: 100%;" bind:value={current_facet}>
          <option value="any">any</option>
          <option value="text">text</option>
          <option value="face">face</option>
          <option value="arch">architecture</option>
          <option value="indoor">indoor</option>
          <option value="logo">logo</option>
          <option value="nature">nature</option>
          <option value="pose">pose</option>
        </select>
        {/if}
        <a href="{microscope_url(neuron)}">
          <div style="height:80px">
          </div>
        </a>
    </div>
    <img 
        style='grid-row: facet {facet_i+1}; grid-column: [display] {display_i+1};' 
        src={display_url_f(neuron, display_i == 0 ? current_facet: facet)} 
        alt="{neuron.name} neuron image">
    {/each}{/each}
</div>


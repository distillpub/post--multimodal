<script>
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
  
    let neurons = [
      {
        neuron: {model: "4x", unit: "1543", layer: "image_block_4_5_Add_6_0"},
        facet: "face",
        ds_img_prefix: "",
        description: 'Aroused',
        strength: 8
      },
      {
        neuron: {model: "4x", unit: "1825", layer: "image_block_4_5_Add_6_0"},
        facet: "face",
        ds_img_prefix: "",
        description: 'Price Tag',
        strength: 5
      },
      {
        neuron: {model: "4x", unit: "599", layer: "image_block_4_5_Add_6_0"},
        facet: "face",
        ds_img_prefix: "",
        description: 'Accept',
        strength: 5
      },
    ];
  </script>
  <style>
    a.outer-neuron-container {
      display: block;
      border-bottom: none;
      margin-bottom: 10px;
    }
    .neuron-container {
      display: flex;
      flex-direction: row;
      width: fit-content;
      margin-bottom: 4px;
      border-radius: 8px;
      border: 1px solid #DDD;
      background: #DDD;
      overflow: hidden;
      gap: 1px;
    }
    a.outer-neuron-container:hover .neuron-container {
      border: 1px solid #AAA;
    }
    .neuron-description {
      max-width: 80px;
    }
    .dataset-example {
      width: 100%;
      background: #CCC;
    }
    .neuron-feature-viz{
      width: 80px;
      height: 80px;
    }
    .neurons {
        display: flex;
        flex-direction: row;
        gap: 4px;
    }

    @media only screen and (max-width: 1600px) {
      .neuron-feature-viz{
        width: 65px;
        height: 65px;
      }
    }
  </style>
  
<div class="neurons">
  {#each neurons as neuron}
  <a class="outer-neuron-container" href="{microscope_url(neuron.neuron)}">
  <div class="neuron-container">
    <img class="neuron-feature-viz" src="{facet_icon_url(neuron.neuron, neuron.facet, neuron.strength)}" alt="" style="grid-row: 1; grid-column: 1;"/>

  </div>
  <div class="figcaption neuron-description">
    {@html neuron.description}
  </div>
  </a>
  {/each}
</div>
  
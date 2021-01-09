<script>
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
    import { isNumber } from 'lodash'
const width = 128
// const width = 288

    let neurons = [
      {
        neuron: {model: "4x", unit: "1551", layer: "image_block_4_5_Add_6_0"},
        facet: "indoor",
        ds_img_prefix: "",
        description: 'Incarcerated',
        strength: 0
      },
      /*
      {
        neuron: {model: "4x", unit: "1543", layer: "image_block_4_5_Add_6_0"},
        facet: "face",
        ds_img_prefix: "",
        description: 'Aroused',
        strength: 8
      },
      */
      {
        neuron: {model: "4x", unit: "2202", layer: "image_block_4_5_Add_6_0"},
        facet: "text",
        ds_img_prefix: "",
        description: 'Question Mark',
        strength: 3
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
      width: min-content;
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
      width: 90px;
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
  
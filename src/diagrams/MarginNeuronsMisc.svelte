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
    .outer-neuron-container {
      display: block;
      border-bottom: none;
      margin-bottom: 10px;
      --size: 100px;
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
    .outer-neuron-container:hover .neuron-container {
      border: 1px solid #AAA;
      background: #AAA;
    }
    .neuron-description {
      margin-top: -4px;
      max-width: 200px;
    }
    /* @media only screen and (min-width: 1500px) {
      a.outer-neuron-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 16px;
      }
      .neuron-description {
        max-width: 150px;
        margin-top: -2px;
      }
    } */
    .dataset-example {
      width: calc( var(--size) / 2);
      height: calc( var(--size) / 2);
      background: #CCC;
    }
    .neuron-feature-viz{
      width: calc( var(--size) + 1px);
      height: 100px;
    }
    .dataset-examples {
      display: grid;
      grid-gap: 1px;
    }
    @media only screen and (max-width: 1600px) {
      .dataset-example:nth-child(n+5) {
        display: none;
      }
    }
    .dropdown {
        opacity: 0;
    }

    .dropdown:hover {
        opacity: 0.8;
    }

    .neurons {
        display: flex;
        flex-direction: row;
        gap: 4px;
    }
  </style>
  
  <div class = "neurons">
    {#each neurons as neuron}
    <div class="outer-neuron-container">
    <div class="neuron-container" style="position:relative">
      <div class="dropdown" style="position: absolute; left: 3px; top:-3px; height: 90px"> 
          <select style="width: 100%;" bind:value={neuron.facet}>
            <option value="any">any</option>
            <option value="text">text</option>
            <option value="face">face</option>
            <option value="arch">architecture</option>
            <option value="indoor">indoor</option>
            <option value="logo">logo</option>
            <option value="nature">nature</option>
            <option value="pose">pose</option>
          </select>
          <a href="{microscope_url(neuron.neuron)}">
            <div style="height:80px">
            </div>
          </a>
      </div>
      <a class="neuron-feature-viz" href="{microscope_url(neuron.neuron)}">
        <img class="neuron-feature-viz" src="{facet_icon_url(neuron.neuron, neuron.facet, neuron.strength || 5)}" alt="" style="grid-row: 1; grid-column: 1;"/>
      </a>
      </div>
    <div class="figcaption neuron-description">
      {@html neuron.description}
    </div>

    </div>
    
    {/each}
  </div>
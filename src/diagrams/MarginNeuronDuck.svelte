<script>
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
  
    let neurons = [
      {
        neuron: {model: "4x", unit: "1692", layer: "image_block_4_5_Add_6_0"},
        facet: "face",
        ds_img_prefix: "images/neuron-examples/duck-",
        description: 'Silly Expressions'
      },
    ];
  </script>
  <style>
    a.outer-neuron-container {
      display: block;
      border-bottom: none;
      margin-bottom: 10px;
      --size: 100px;
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
      background: #AAA;
    }
    .neuron-description {
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
      height: calc( var(--size) + 1px);
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
  </style>
  
  {#each neurons as neuron}
  <a class="outer-neuron-container" href="{microscope_url(neuron.neuron)}">
  <div class="neuron-container">
    <img class="neuron-feature-viz" src="{facet_icon_url(neuron.neuron, neuron.facet)}" alt="" style="grid-row: 1; grid-column: 1;"/>
    <div class="dataset-examples">
      <img class="dataset-example" src="{neuron.ds_img_prefix}1.png" alt="" style="grid-row: 1; grid-column: 1;"/>
      <img class="dataset-example" src="{neuron.ds_img_prefix}2.png" alt="" style="grid-row: 2; grid-column: 1;"/>
      <img class="dataset-example" src="{neuron.ds_img_prefix}3.png" alt="" style="grid-row: 1; grid-column: 2;"/>
      <img class="dataset-example" src="{neuron.ds_img_prefix}4.png" alt="" style="grid-row: 2; grid-column: 2;"/>
      <img class="dataset-example" src="{neuron.ds_img_prefix}5.png" alt="" style="grid-row: 1; grid-column: 3;"/>
      <img class="dataset-example" src="{neuron.ds_img_prefix}6.png" alt="" style="grid-row: 2; grid-column: 3;"/>
    </div>
  </div>
  <div class="figcaption neuron-description">
    {@html neuron.description}
  </div>
  </a>
  {/each}
  
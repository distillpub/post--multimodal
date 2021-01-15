<script>
  import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';

  let neurons = [
    {
      neuron: {model: "4x", unit: "1330", layer: "image_block_4_5_Add_6_0"},
      facet: "any",
      ds_img_prefix: "typographic/RN50-4x-1330-dataset-",
      description: 'Neuron responding to piggy banks also responds to "price", "cheap", and "$".'
    },
    // {
    //   neuron: {model: "4x", unit: "1450", layer: "image_block_4_5_Add_6_0"},
    //   facet: "any",
    //   ds_img_prefix: "typographic/RN50-4x-1450-dataset-",
    //   description: 'A neuron responding to "iPod", "iOS", and "iPhone" as well as apples, Apple products, and the Apple logo.'
    // },
    {
      neuron: {model: "4x", unit: "1156", layer: "image_block_4_5_Add_6_0"},
      facet: "indoor",
      ds_img_prefix: "typographic/RN50-4x-1156-dataset-",
      description: 'Neuron responding to waste containers (and necklaces) also responds to "trash", "waste", and "garbage."'
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
    max-width: 200px;
  }
  @media only screen and (min-width: 1500px) {
    a.outer-neuron-container {
      display: flex;
      flex-direction: row;
      justify-content: start;
      gap: 16px;
    }
    .neuron-description {
      max-width: 150px;
      margin-top: -2px;
      margin-bottom: 30px;
      line-height: 15px;
    }
  }
  .dataset-example {
    width: 100%;
    background: #CCC;
  }
  .neuron-feature-viz{
    width: 90px;
    height: 90px;
  }
  .dataset-examples {
    display: grid;
    grid-template-rows: repeat(2, atuo);
    grid-template-columns: repeat(2, auto);
    width: 90px;
    height: 90px;
    grid-gap: 1px;
  }
  .dropdown {
      opacity: 0;
  }

  .dropdown:hover {
      opacity: 0.8;
  }
  </style>
  
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
    <a href="{microscope_url(neuron.neuron)}">
      <div class="dataset-examples">
        <img class="dataset-example" src="{neuron.ds_img_prefix}1.png" alt="" style="grid-row: 1; grid-column: 1;"/>
        <img class="dataset-example" src="{neuron.ds_img_prefix}2.png" alt="" style="grid-row: 2; grid-column: 1;"/>
        <img class="dataset-example" src="{neuron.ds_img_prefix}3.png" alt="" style="grid-row: 1; grid-column: 2;"/>
        <img class="dataset-example" src="{neuron.ds_img_prefix}4.png" alt="" style="grid-row: 2; grid-column: 2;"/>
      </div>
    </a>
    </div>
  </div>
  <div class="figcaption neuron-description">
    {@html neuron.description}
  </div>
  
  {/each}
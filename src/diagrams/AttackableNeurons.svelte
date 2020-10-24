<script>
import NeuronCard from '../components/NeuronCard.svelte';
</script>
<style>
  .neuron-container {
    display: flex;
    flex-direction: row;
    width: fit-content;
    margin-bottom: 4px;
    gap: 4px;
  }
  .neuron-description {
    max-width: 200px;
  }
  .outer-neuron-container {
    margin-bottom: 10px;
  }
  @media only screen and (min-width: 1500px) {
    .outer-neuron-container {
      display: flex;
      flex-direction: row;
      justify-content: start;
      gap: 8px;
    }
    .neuron-description {
      max-width: 150px;
    }
  }
  .dataset-example {
    width: 100%;
    background: #CCC;
  }
  .dataset-examples {
    display: grid;
    grid-template-rows: repeat(2, atuo);
    grid-template-columns: repeat(2, auto);
    width: 100px;
    grid-gap: 1px;
    border-radius: 8px;
    border: 1px solid #AAA;
    background: #AAA;
    overflow: hidden;
  }
</style>
<div class="outer-neuron-container">
<div class="neuron-container">
  <div class="neuron-feature-viz">
    <NeuronCard neuron={{model: "4x", unit: "1330", layer: "image_block_4_5_Add_6_0"}} facets={["any"]} ds={false} />
  </div>
  <div class="dataset-examples">
    <img class="dataset-example" src="typographic/RN50-4x-1330-dataset-1.png" alt="" style="grid-row: 1; grid-column: 1;"/>
    <img class="dataset-example" src="typographic/RN50-4x-1330-dataset-2.png" alt="" style="grid-row: 1; grid-column: 2;"/>
    <img class="dataset-example" src="typographic/RN50-4x-1330-dataset-3.png" alt="" style="grid-row: 2; grid-column: 1;"/>
    <img class="dataset-example" src="typographic/RN50-4x-1330-dataset-4.png" alt="" style="grid-row: 2; grid-column: 2;"/>
  </div>
</div>
<div class="figcaption neuron-description">
  <p>
    Neuron responding to piggy banks also responds to "price", "cheap", and "$".
  </p>
</div>
</div>

<!--<div class="outer-neuron-container">
  <div class="neuron-container">
  <div class="neuron-feature-viz">
    <NeuronCard neuron={{model: "4x", unit: "1450", layer: "image_block_4_5_Add_6_0"}} facets={["any"]} ds={false} />
  </div>
  <div class="dataset-examples">
    <img class="dataset-example" src="typographic/RN50-4x-1450-dataset-1.png" alt="" style="grid-row: 1; grid-column: 1;"/>
    <img class="dataset-example" src="typographic/RN50-4x-1450-dataset-2.png" alt="" style="grid-row: 1; grid-column: 2;"/>
    <img class="dataset-example" src="typographic/RN50-4x-1450-dataset-3.png" alt="" style="grid-row: 2; grid-column: 1;"/>
    <img class="dataset-example" src="typographic/RN50-4x-1450-dataset-4.png" alt="" style="grid-row: 2; grid-column: 2;"/>
  </div>
</div>
<div class="figcaption neuron-description">
  <p>
    A neuron responding to "iPod", "iOS", and "iPhone" as well as apples, Apple products, and the Apple logo.
  </p>
</div>
</div>-->

<div class="outer-neuron-container">
<div class="neuron-container">
  <div class="neuron-feature-viz">
    <NeuronCard neuron={{model: "4x", unit: "1156", layer: "image_block_4_5_Add_6_0"}} facets={["indoor"]} ds={false} />
  </div>
  <div class="dataset-examples">
    <img class="dataset-example" src="typographic/RN50-4x-1156-dataset-1.png" alt="" style="grid-row: 1; grid-column: 1;"/>
    <img class="dataset-example" src="typographic/RN50-4x-1156-dataset-2.png" alt="" style="grid-row: 1; grid-column: 2;"/>
    <img class="dataset-example" src="typographic/RN50-4x-1156-dataset-3.png" alt="" style="grid-row: 2; grid-column: 1;"/>
    <img class="dataset-example" src="typographic/RN50-4x-1156-dataset-4.png" alt="" style="grid-row: 2; grid-column: 2;"/>
  </div>
</div>
<div class="figcaption neuron-description">
  <p>
    Neuron responding to waste containers (and necklaces) aso responds to "trash", "waste", and "gargabe."
  </p>
</div>
</div>

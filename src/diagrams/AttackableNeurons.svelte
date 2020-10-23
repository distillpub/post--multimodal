<script>
import NeuronCard from '../components/NeuronCard.svelte';
</script>
<style>
  .neuron-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 6px;
  }
  .neuron-feature-viz {
    margin-right: 5px;
  }
  .dataset-example {
    width: 45px;
    height: 45px;
    border: 1px solid #888;
  }
  .dataset-examples {
    display: grid;
    grid-template-rows: repeat(2);
    grid-template-columns: repeat(2);
    grid-gap: 5px;
  }
  .neuron-description {
    max-width: 200px;
  }
</style>
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
    A neuron responding to images of piggy banks also responds to texts like <i>price</i> and <i>cheap</i>, as well as numerical prices prefixed with <i>$</i>.
  </p>
</div>
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
    A neuron responding to the words <i>iPod, iOS,</i> and <i>iPhone</i> as well as images of apples, Apple products, and the Apple logo.
  </p>
</div>
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
    A neuron responding to the words <i>trash, waste,</i> and <i>garbage</i> as well as images of garbage cans, recycling cans, and large necklaces.
  </p>
</div>

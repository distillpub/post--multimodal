<script>
import MicroscopeButton from '../components/MicroscopeButton.svelte'
</script>
<style>
  .reading-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .reading-neuron-feature-viz {
    border-radius: 5px;
  }
  .reading-neuron-dataset-example {
    margin: 0px;
  }
  .reading-neuron-dataset-examples {
    display: grid;
    grid-template-rows: repeat(2);
    grid-template-columns: repeat(2);
    grid-gap: 2px;
  }
  .reading-neuron {
    width: 30%;
    margin: 20px;
  }
</style>
<div class="reading-container">
  <div class="reading-neuron">
    <p><small>price, cheap, $</small></p>
    <img class="reading-neuron-feature-viz" src="typographic/RN50-4x-channel-1330.png" alt=""/>
    <div class="reading-neuron-dataset-examples">
      <img class="reading-neuron-dataset-example" src="typographic/RN50-4x-1330-dataset-1.png" alt="" style="grid-row: 1; grid-column: 1;"/>
      <img class="reading-neuron-dataset-example" src="typographic/RN50-4x-1330-dataset-2.png" alt="" style="grid-row: 1; grid-column: 2;"/>
      <img class="reading-neuron-dataset-example" src="typographic/RN50-4x-1330-dataset-3.png" alt="" style="grid-row: 2; grid-column: 1;"/>
      <img class="reading-neuron-dataset-example" src="typographic/RN50-4x-1330-dataset-4.png" alt="" style="grid-row: 2; grid-column: 2;"/>
    </div>
    <MicroscopeButton style="float: right" data-unit="1330" data-model="4x" data-layer="image_block_4_5_Add_6_0"/>
  </div>
</div>
<div class="figcaption">
  <p>
    Caption.
  </p>
</div>

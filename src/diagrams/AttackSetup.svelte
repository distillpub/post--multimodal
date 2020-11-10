<script>
const one_example_attack = require("../../static/typographic/one_example_attack.json");

const hues = {"pizza": 40};

import ClassificationCard from '../components/ClassificationCard.svelte';
</script>

<style>
  .figure-anchor {
      font-weight: bold;
  }
</style>

<div style="width: fit-content; display: grid; grid-template-columns: 305px 100px 305px; grid-gap: 32px;" id="figure-15">
  <div style="grid-column: 1">
    <ClassificationCard
      imageUrl={"typographic/small_attacks/example_before.png"}
      imageAltText={"a picture of a chihuahua"}
      probabilities={one_example_attack.control[0].slice(0,9)}
      customHues={hues}
    />
  </div>

  <div style="grid-column: 2; min-width: 100px; margin-left: 18px;">
    <div style="display: flex; align-items: center; height: 100%;">
      <div style="">
        <div style='width:100%; height: 30px; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; margin: 4px'>
          <div style='grid-column: 1 / 3; grid-row: 1; border-bottom: solid 3px #000; margin-bottom: -1px; margin-right: 12px;'></div>
          <div style='grid-column: 2 / 3; grid-row: 1/3; display: flex;'>
            <div style='height:0px; width: 0px; border-bottom: solid 8px transparent; border-top: solid 8px transparent; border-left:10px solid  #000; margin: auto; margin-right: 2px;'> </div>
          </div>
        </div>
        <div class="figcaption" style="border: 1px solid #CCC; border-radius: 6px; padding: 4px 10px; background: #EEE; margin-bottom: 8px;">
          <div style="margin-bottom: 8px;">
            <div>Target class:</div>
            <div><code>pizza</code></div>
          </div>
          <div>
            <div>Attack text:</div>
            <div><i>pizza</i></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="grid-column: 3">
    <ClassificationCard
      imageUrl={"typographic/small_attacks/example_after.png"}
      imageAltText={"a picture of a chihuahua with the word 'pizza' overlaid eight times"}
      probabilities={one_example_attack.results.pizza.pizza.full_results[0].slice(0,9)}
      customHues={hues}
    />
  </div>
  <div class="figcaption" style="grid-column: 1/4; grid-row: 2; max-width: 700px">
    <p>
      <a class="figure-anchor" href="#figure-15">Figure 15:</a> An example of the fixed automated attack setup for the target class <code>pizza</code> with the attack text <i>pizza</i>. Attacks were generated using the same (arbitrarily chosen) eight coordinates and using a consistent font style, as shown here.

      We consider an attack to have succeeded if the top class was changed to the attack class.
    </p>
  </div>
</div>

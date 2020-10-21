<style>
    .figure-anchor {
        font-weight: bold;
    }
</style>

<script>

let data = require("../../static/typographic/in_the_wild_3.json");

let trueLabels = {
    "pizza": ["pizza"],
    "laptop": ["laptop computer"],
    "plant": ["plant pot"],
    "trash": ["waste container"],
    "cup": ["measuring cup"],
    "pitcher": ["water jug"],
    "water": ["water jug"],
    "mug": ["coffee mug"]
}

let adversarialLabels = {
    "blank":  {
      "hue": null,
      "labels": [],
    },
    "cup": {
      "hue": 160,
      "labels": ["measuring cup"]
    },
    "laptop": {
      "hue": 180,
      "labels": ["laptop computer", "desktop computer"]
    },
    "mug": {
      "hue": 200,
      "labels": ["coffee mug"]
    },
    "pizza": {
      "hue": 220,
      "labels": ["pizza"]
    },
    "plant": {
      "hue": 240,
      "labels": ["plant pot"]
    },
    "water": {
      "hue": 260,
      "labels": ["water jug"]
    },
    "defaultHue": 0,
}

function hues(label) {
  return adversarialLabels[label].labels.reduce(function(output, trueLabel) {
    output[trueLabel] = adversarialLabels[label].hue;
    return output;
  }, {});
}

let showHidden = false;
let selectedStatistics = "zero_shot_statistics";

import ClassificationCard from '../components/ClassificationCard.svelte';
</script>

<div style="overflow-x: auto;">
  <div style="width: fit-content; margin: auto;">
    <div style="display: grid; grid-template-rows: repeat({ showHidden ?  Object.entries(data).length : 4}); grid-template-columns: repeat({ showHidden ? Object.entries(data.mug).length : 4}); overflow: auto; grid-gap: 10px;">
      {#each Object.entries(data.mug).slice(0, showHidden ? 6 : 4) as [label, results], col_index}
        <h4 style="grid-column: { col_index + 1}; margin-bottom: 0px">{@html label === "blank" ? "No label" : "Labeled &ldquo;" + label + "&rdquo;" }</h4>
      {/each}
      {#each Object.keys(data).sort().slice(0, showHidden ? Object.entries(data).length : 4) as item, row_index}
        {#each Object.entries(data[item]).slice(0, showHidden ? Object.entries(data.mug).length : 4) as [label, results], col_index}
          <div style="grid-column: {col_index + 1 }">
            <ClassificationCard
              imageUrl={`/typographic/in-the-wild-3/${item}-${label}.jpg`}
              imageAltText={`${item} labeled ${label}`}
              probabilities={results[selectedStatistics]}
              customHues={hues(label)}
            />
          </div>
        {/each}
      {/each}
    </div>
    <div class="figcaption" style="max-width: 600px; margin-top: 16px;">
      <p>
        <a class="figure-anchor" href="#in-the-wild-1">Figure N:</a>
        Physical typographic attacks.
      </p>
      <p>
        For these attacks, we observe that the zero-shot methodology is somewhat consistently effective, but that the linear probes methodology is ineffective. Later on, we show an attack style that also works against the linear probes methodology.
      <p>
        In the <b>zero-shot</b> methodology, we convert the multimodal model to an ImageNet classifier by calculating probabilities on the completion “a photo of a ___” for each ImageNet class.
      </p>
      <p>
        In the <b>linear probes</b> methodology, we use the ImageNet training set to train a linear regression on the last layer of activations, then apply that linear regression in order to convert the model into an ImageNet converter.<d-footnote>One could also fine-tune the model on ImageNet; we do not include that methodology because there is a substantial amount of degrees of freedom in how far to fine-tine, and because even ignoring that we found that the fine-tuned model did not perform substantially better on ImageNet at baseline than the linear probes methodology does.</d-footnote>
      </p>
    </div>
  </div>
  <input type="checkbox" bind:checked={showHidden} /> Show extra examples
  <br/>
  <!-- <button on:click={function() {showHidden = !showHidden}}>
    {showHidden ? "Hide extra examples" : "Show extra examples"}
  </button> -->
  Methodology:
  <select bind:value={selectedStatistics}>
    <option value="zero_shot_statistics">
      Zero-shot
    </option>
    <option value="linear_probe_statistics">
      Linear probes
    </option>
  </select>
</div>

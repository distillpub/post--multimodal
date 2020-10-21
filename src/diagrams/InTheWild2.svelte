<style>
    .figure-anchor {
        font-weight: bold;
    }
</style>

<script>
const attacks_2 = require('../../static/typographic/in_the_wild_2.json');

let selectedStatistics = "zero_shot_statistics";

let trueLabels = {
    "mug": ["coffee mug"],
    "glass": ["beer glass"],
    "plant": ["plant pot"],
    "laptop": ["laptop computer"],
    "phone": ["rotary dial telephone"],
    "trash": ["waste container"],
    "wine": ["red wine"],
    "apple": ["apple", "Granny Smith"],
    "toaster": ["toaster"],
}


let adversarialLabels = {
  "ipod": {
    "hue": 100,
    "labels": ["iPod"],
  },
  "library": {
    "hue": 120,
    "labels": ["library"],
  },
  "mug": {
    "hue": 140,
    "labels": ["coffee mug"],
  },
  "pizza": {
    "hue": 160,
    "labels": ["pizza"],
  },
  "plant": {
    "hue": 180,
    "labels": ["plant"],
  },
  "rifle": {
    "hue": 200,
    "labels": ["rifle"],
  },
  "toaster": {
    "hue": 220,
    "labels": ["toaster"],
  },
  "trash": {
    "hue": 240,
    "labels": ["waste container"],
  },
  "website": {
    "hue": 260,
    "labels": ["website"],
  },
  "laptop": {
    "hue": 280,
    "labels": ["laptop computer", "desktop computer"],
  },
  "blank":  {
    "hue": null,
    "labels": [],
  },
  "defaultHue": 0,
}

function hues(label) {
  return adversarialLabels[label].labels.reduce(function(output, trueLabel) {
    output[trueLabel] = adversarialLabels[label].hue;
    return output;
  }, {});
}

import ClassificationCard from '../components/ClassificationCard.svelte';
</script>

<div style="overflow-x: auto;">
  <div style="width: fit-content; margin: auto;">
    <div style="display: grid; grid-template-rows: repeat({Object.entries(attacks_2).length }); grid-template-columns: repeat({Object.entries(attacks_2.mug).length }); overflow: auto; grid-gap: 5px;">
      {#each Object.entries(attacks_2.mug) as [label, results], col_index}
        <h4 style="grid-column: { col_index + 1}; margin-bottom: 0px">{@html label === "blank" ? "No label" : "Labeled &ldquo;" + label + "&rdquo;" }</h4>
      {/each}
      {#each Object.entries(attacks_2) as [item, labels], row_index}
        {#each Object.entries(labels) as [label, results], col_index}
          <div style="grid-column: {col_index + 1 }">
            <ClassificationCard
              imageUrl={`/typographic/in-the-wild-2/${item}-${label}.jpg`}
              imageAltText={`${item} labeled ${label}`}
              probabilities={results[selectedStatistics].slice(0, 9)}
              customHues={hues(label)}
            />
          </div>
        {/each}
        <br/>
      {/each}
    </div>
    <div class="figcaption">
      <p><a class="figure-anchor" href="#in-the-wild-2">Figure N:</a> Additional in-the-wild attacks.</p>
      <p>In a shoutout to <i>Adversarial Patch</i> we include the label <i>toaster</i> on a whim, and find that it does surprisingly well as a typographic attack!</p>
    </div>
  </div>
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

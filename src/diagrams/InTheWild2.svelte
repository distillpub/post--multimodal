<style>
  .figure-anchor {
      font-weight: bold;
  }
  .expander-icon {
    height: 26px;
    width: 13px;
    float: left;
    padding: 3px;
    padding-right: 7px;
  }
  .clickable-toggle {
    color: blue;
    border-color: blue;
    text-decoration: none;
  }
  .clickable-toggle:hover {
    color: lightblue;
    border-color: lightblue;
    cursor: pointer;
  }
</style>

<script>
const attacks_2 = require('../../static/typographic/in_the_wild_2.json');

let showHidden = false;
let selectedStatistics = "zero_shot_statistics";

let HEIGHT_WHEN_HIDDEN = 5
let WIDTH_WHEN_HIDDEN = 4

function show() {
  showHidden = true;
}
function hide() {
  showHidden = false;
}

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
    <div style="display: grid; grid-template-rows: repeat({ showHidden ?  Object.entries(attacks_2).length : HEIGHT_WHEN_HIDDEN}); grid-template-columns: repeat({ showHidden ? Object.entries(attacks_2.mug).length : 4}); grid-gap: 10px;">
      {#each Object.entries(attacks_2.mug).slice(0, showHidden ? Object.entries(attacks_2.mug).length : WIDTH_WHEN_HIDDEN) as [label, results], col_index}
        <h4 style="grid-column: { col_index + 1}; margin-bottom: 0px">{@html label === "blank" ? "No label" : "Labeled &ldquo;" + label + "&rdquo;" }</h4>
      {/each}
      {#each Object.keys(attacks_2).sort().slice(0, showHidden ? Object.entries(attacks_2).length : HEIGHT_WHEN_HIDDEN) as item, row_index}
        {#each Object.entries(attacks_2[item]).slice(0, showHidden ? Object.entries(attacks_2.mug).length : WIDTH_WHEN_HIDDEN) as [label, results], col_index}
          <div style="grid-column: {col_index + 1 }">
            <ClassificationCard
              imageUrl={`/typographic/in-the-wild-2/${item}-${label}.jpg`}
              imageAltText={`${item} labeled ${label}`}
              probabilities={results[selectedStatistics].slice(0, 9)}
              customHues={hues(label)}
            />
          </div>
        {/each}
      {/each}
    </div>
    <div>
      {#if showHidden}
        <img src="/typographic/collapse.svg" class="expander-icon" />
      {:else}
        <img src="/typographic/expand.svg" class="expander-icon" />
      {/if}
      {#if showHidden}
        <a on:click={hide} class="clickable-toggle">
          Hide
        </a>
      {:else}
        <a on:click={show} class="clickable-toggle">
          Show more
        </a>
      {/if}
    </div>
  </div>
</div>
<div class="figcaption" style="max-width: 600px; margin-top: 16px; padding-left: 20%">
  <p>
    <a class="figure-anchor" href="#in-the-wild-1">Figure N:</a>
    Physical typographic attacks.
  </p>
  <p>
    In the <b>zero-shot</b> methodology, we convert the CLIP RN50-4x model to an ImageNet classifier by calculating probabilities on the completion “a photo of a ___” for each ImageNet class.
  </p>
  <p>
    In the <b>linear probes</b> methodology, we use the ImageNet training set to train a linear regression on the last layer of activations, then apply that linear regression in order to convert the model into an ImageNet converter.<d-footnote>One could also fine-tune the model on ImageNet; we do not include that methodology because there is a substantial amount of degrees of freedom in how far to fine-tine, and because even ignoring that we found that the fine-tuned model did not perform substantially better on ImageNet at baseline than the linear probes methodology does.</d-footnote>
  </p>
  <p>
    For this style of attack, we observe that the zero-shot methodology is somewhat consistently effective, but that the linear probes methodology is ineffective. Later on, we show an attack style that also works against the linear probes methodology. See statistics below.
  </p>
  <br/>
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

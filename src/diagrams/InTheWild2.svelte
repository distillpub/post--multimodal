<!-- Potential todos
  - Line underneath entire diagram to break up the vertical line
    (Row labeled 'line', div that fills the entire area)
  - Line under overall title for full figure (in addition OR instead)
-->

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
    /* text-decoration: none;
    border: none; */
    margin-top: 7px;
  }
  .clickable-toggle:hover {
    cursor: pointer;
    /* color: #aaa; */
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
    "hue": 40,
    "labels": ["iPod"],
  },
  "library": {
    "hue": 40,
    "labels": ["library"],
  },
  "mug": {
    "hue": 40,
    "labels": ["coffee mug"],
  },
  "pizza": {
    "hue": 40,
    "labels": ["pizza"],
  },
  "plant": {
    "hue": 40,
    "labels": ["plant"],
  },
  "rifle": {
    "hue": 40,
    "labels": ["rifle"],
  },
  "toaster": {
    "hue": 40,
    "labels": ["toaster"],
  },
  "trash": {
    "hue": 40,
    "labels": ["waste container"],
  },
  "website": {
    "hue": 40,
    "labels": ["website"],
  },
  "laptop": {
    "hue": 40,
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

function numRows(showHidden) {
  return showHidden ? Object.entries(attacks_2).length : HEIGHT_WHEN_HIDDEN;
}

function numCols(showHidden) {
  return showHidden ? Object.entries(attacks_2.mug).length : WIDTH_WHEN_HIDDEN;
}

function numLabelsPerCard(showHidden) {
  return showHidden ? 9 : 6;
}

import ClassificationCard from '../components/ClassificationCard.svelte';
</script>

<div style="overflow-x: auto;" id="figure-14">
  <div style="width: fit-content; margin: auto;">
    <div style="display: grid; grid-gap: 10px; grid-template-rows: repeat({numRows(showHidden) + 1}, auto) [caption] auto; grid-template-columns: [caption-left-start] auto auto [caption-left-end caption-right-start] repeat({numCols(showHidden) - 2}, auto) [caption-right-end] auto;">
      {#each Object.entries(attacks_2.mug).slice(0, numCols(showHidden)) as [label, results], col_index}
        <h4 style="grid-column: { col_index + 1}; margin-bottom: 0px">{@html label === "blank" ? "No label" : "Labeled &ldquo;" + label + "&rdquo;" }</h4>
      {/each}
      {#each Object.keys(attacks_2).sort().slice(0, numRows(showHidden)) as item, row_index}
        {#each Object.entries(attacks_2[item]).slice(0, numCols(showHidden)) as [label, results], col_index}
          <div style="grid-column: {col_index + 1 }">
            {#if showHidden}
              <ClassificationCard
                imageUrl={`typographic/in-the-wild-2/${item}-${label}.jpg`}
                imageAltText={`${item} labeled ${label}`}
                probabilities={results[selectedStatistics].slice(0, numLabelsPerCard(showHidden))}
                customHues={hues(label)}
              />
            {:else}
              <ClassificationCard
                imageUrl={`typographic/in-the-wild-2/${item}-${label}.jpg`}
                imageAltText={`${item} labeled ${label}`}
                probabilities={results[selectedStatistics].slice(0, numLabelsPerCard(showHidden))}
                customHues={hues(label)}
              />
            {/if}
          </div>
        {/each}
      {/each}
      <div class="figcaption" style="grid-area: caption-left; max-width: 550px;">
        <p>
          <a class="figure-anchor" href="#figure-14">Figure 14:</a>
          Physical typographic attacks.

          Above we see the CLIP RN50-4x model's classifications of objects labeled with incorrect ImageNet classes. Each row corresponds to an object, and each column corresponds to a labeling. Some attacks are more effective than others, and some objects are more resilient to attack.
        </p>
        <p>
          {#if showHidden}
            <button on:click={hide} class="clickable-toggle figcaption">
              Collapse more examples
            </button>
          {:else}
            <button on:click={show} class="clickable-toggle figcaption">
              Expand more examples
            </button>
          {/if}
        </p>
      </div>
      <div class="figcaption" style="grid-area: caption-right; max-width: 550px;">
        <p>
          Recall that there are two ways to use CLIP for ImageNet classification: zero-shot and linear probes.

          For this style of attack, we observe that the zero-shot methodology is somewhat consistently effective, but that the linear probes methodology is ineffective. Later on, we show an attack style that also works against the linear probes methodology. See statistics <a href="#automated-attacks-figure">below</a>.
        </p>
        <p>
          Displayed ImageNet classification method:
          <select bind:value={selectedStatistics} class="figcaption">
            <option value="zero_shot_statistics">
              Zero-shot
            </option>
            <option value="linear_probe_statistics">
              Linear probes
            </option>
          </select>
        </p>
        <!-- <p>
          In the <b>zero-shot</b> methodology, we convert the model to an ImageNet classifier by calculating probabilities on the completion “a photo of a ___” for each ImageNet class.
        </p>
        <p>
          In the <b>linear probes</b> methodology, we use the ImageNet training set to train a linear regression on the last layer of activations, then apply that linear regression in order to convert the model into an ImageNet converter.<d-footnote>One could also fine-tune the model on ImageNet; we do not include that methodology because there is a substantial amount of degrees of freedom in how far to fine-tine, and because even ignoring that we found that the fine-tuned model did not perform substantially better on ImageNet at baseline than the linear probes methodology does.</d-footnote>
        </p> -->
      </div>
    </div>
  </div>
</div>

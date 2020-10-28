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
const stroop = require('../../static/typographic/stroop_experiment.json');

let showHidden = false;
let selectedStatistics = "zero_shot_statistics";

let HEIGHT_WHEN_HIDDEN = 4
let WIDTH_WHEN_HIDDEN = 4

function show() {
  showHidden = true;
}
function hide() {
  showHidden = false;
}

function numRows(showHidden) {
  return showHidden ? Object.entries(stroop.output).length : HEIGHT_WHEN_HIDDEN;
}

function numCols(showHidden) {
  return showHidden ? Object.entries(stroop.output.black).length : WIDTH_WHEN_HIDDEN;
}

function numLabelsPerCard(showHidden) {
  return 8;
}

function hues(label) {
  let output = {};
  output[label] = 40;
  return output;
}

import ClassificationCard from '../components/ClassificationCard.svelte';
</script>

<div style="overflow-x: auto;">
  <div style="width: fit-content; margin: auto;">
    <div style="display: grid; grid-gap: 10px; grid-template-rows: repeat({numRows(showHidden) + 1}, auto) [caption] auto; grid-template-columns: [caption-left-start] auto auto [caption-left-end caption-right-start] repeat({numCols(showHidden) - 2}, auto) [caption-right-end] auto;">
      {#each Object.keys(stroop.output).sort().slice(0, numRows(showHidden)) as item, row_index}
        {#each Object.entries(stroop.output[item]).slice(0, numCols(showHidden)) as [label, results], col_index}
          <div style="grid-column: {col_index + 1 }">
            {#if item !== label}
              {#if showHidden}
                <ClassificationCard
                  imageUrl={results.url}
                  imageAltText={`${item} labeled ${label}`}
                  probabilities={results.results.slice(0, numLabelsPerCard(showHidden))}
                  customHues={hues(label)}
                />
              {:else}
                <ClassificationCard
                  imageUrl={results.url}
                  imageAltText={`${item} labeled ${label}`}
                  probabilities={results.results.slice(0, numLabelsPerCard(showHidden))}
                  customHues={hues(label)}
                />
              {/if}
            {/if}
          </div>
        {/each}
      {/each}
      <div class="figcaption" style="grid-area: caption-left; max-width: 550px;">
        <p>
          <a class="figure-anchor" href="#stroop-experiment">Figure N:</a>
          Stroop experiment.

          Above we see the CLIP RN50-4x model's classifications of various words colored with various colors. Activations were gathered using the zero-shot methodology with the format string "{stroop.setup.zero_shot_setup}_____".
        </p>
        <p>
          The model is susceptible to a sort of Stroop effect.
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
        </p>
      </div>
    </div>
  </div>
</div>

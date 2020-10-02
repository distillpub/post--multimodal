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

import ClassificationCard from '../components/ClassificationCard.svelte';
</script>

<div style="max-width: 1200px; margin: auto;">
  <div style="display: grid; grid-template-rows: repeat({ Object.entries(data).length}); grid-template-columns: repeat({ Object.entries(data.mug).length}); overflow-x: scroll; grid-gap: 10px;">
    {#each Object.entries(data.mug) as [label, results], col_index}
      <h4 style="grid-column: { col_index + 1}; margin-bottom: 0px">{@html label === "blank" ? "Blank" : "Labeled &ldquo;" + label + "&rdquo;" }</h4>
    {/each}
    {#each Object.keys(data).sort() as item, row_index}
      {#each Object.entries(data[item]) as [label, results], col_index}
        <div style="grid-column: {col_index + 1 }">
          <ClassificationCard
            imageUrl={results.image_url}
            imageAltText={`${item} labeled ${label}`}
            probabilities={results.zero_shot_statistics}
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
      Probabilities here calculated using the <b>zero-shot</b> methodology: we convert the multimodal model to an ImageNet classifier by calculating probabilities on the completion “a photo of a ___” for each ImageNet class.
    </p>
  </div>
</div>

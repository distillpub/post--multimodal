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


</script>
  <div style="max-width: 1200px; margin: auto;">
    <div style="display: grid; grid-template-rows: repeat({ Object.entries(data).length}); grid-template-columns: repeat({ Object.entries(data.mug).length}); overflow-x: scroll; grid-gap: 10px;">
      {#each Object.entries(data.mug) as [label, results], col_index}
        <h4 style="grid-column: { col_index + 1}; margin-bottom: 0px">{@html label === "blank" ? "Blank" : "Labeled &ldquo;" + label + "&rdquo;" }</h4>
      {/each}
      {#each Object.keys(data).sort() as item, row_index}
        {#each Object.entries(data[item]) as [label, results], col_index}
        <div style="display: flex; flex-direction: row; border-radius: 6px; overflow: hidden; width: fit-content; height: 121px; border: 1px solid #EEE; grid-column: { col_index + 1}">
          <div style="border-right: 1px solid #EEE">
            <img style="width: 121px;" src="{ results.image_url}?cache=1006" alt="{item} labeled {label}"/>
          </div>
          <div>
            {#each results.zero_shot_statistics as probability}
              <div style="border-bottom: 1px solid #EEE; background-color: hsla({ adversarialLabels[label].labels.includes(probability[1]) ? adversarialLabels[label].hue : adversarialLabels.defaultHue }, { (trueLabels[item].includes(probability[1]) && !adversarialLabels[label].labels.includes(probability[1])) || !adversarialLabels[label].labels.includes(probability[1]) ? "0%" : "70%" } , 50%, { probability[0]}); color: #{ probability[0] < 0.7 ? "000000" : "FFFFFF"}; padding: 0px 10px; line-height: 16px; width: 145px; font-size: 80%">
                <small>{ probability[1]}
                  <span style="float: right;">{ Math.round(probability[0] * 10000) / 100}%</span>
                </small>
              </div>
            {/each}
          </div>
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

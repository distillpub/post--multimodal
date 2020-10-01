<style>
    .figure-anchor {
        font-weight: bold;
    }
</style>

<script>
const attacks_2 = require('../../static/typographic/in_the_wild_2.json');

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

</script>

<div style="max-width: 1440px; margin: auto;">
  <div style="display: grid; grid-template-rows: repeat({Object.entries(attacks_2).length }); grid-template-columns: repeat({Object.entries(attacks_2.mug).length }); overflow-x: scroll; grid-gap: 5px;">
    {#each Object.entries(attacks_2.mug) as [label, results], col_index}
      <h4 style="grid-column: { col_index + 1}; margin-bottom: 0px">{@html label === "blank" ? "Blank" : "Labeled &ldquo;" + label + "&rdquo;" }</h4>
    {/each}
    {#each Object.entries(attacks_2) as [item, labels], row_index}
      {#each Object.entries(labels) as [label, results], col_index}
        <div style="display: flex; flex-direction: row; border-radius: 6px; overflow: hidden; width: fit-content; height: 174px; border: 1px solid #EEE; grid-column: {col_index + 1 }">
          <div style="border-right: 1px solid #EEE">
            <img style="width: 174px;" src="{results.image_url }?cache=26" alt="{item} labeled {label}"/>
          </div>
          <div>
            {#each results.zero_shot_statistics as probability}
              <div style="border-bottom: 1px solid #EEE; background-color: hsla({ adversarialLabels[label].labels.includes(probability[1]) ? adversarialLabels[label].hue : adversarialLabels.defaultHue }, { (trueLabels[item].includes(probability[1]) && !adversarialLabels[label].labels.includes(probability[1])) || !adversarialLabels[label].labels.includes(probability[1]) ? "0%" : "70%" } , 50%, { probability[0]}); color: #{ probability[0] < 0.7 ? "000000" : "FFFFFF"}; padding: 0px 10px; line-height: 16px; width: 145px; font-size: 80%">
                <small>{probability[1] }
                  <span style="float: right;">{Math.round(probability[0] * 10000) / 100 }%</span>
                </small>
              </div>
            {/each}
          </div>
        </div>
      {/each}
      <br/>
    {/each}
  </div>
</div>
<figcaption>
<p><a class="figure-anchor" href="#in-the-wild-2">Figure N:</a> Additional in-the-wild attacks.</p>
<p>In a shoutout to <i>Adversarial Patch</i> we include the label <i>toaster</i> on a whim, and find that it does surprisingly well as a typographic attack!</p>
</figcaption>

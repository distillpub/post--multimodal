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
        "apple": ["apple"],
        "toaster": ["toaster"],
    }

</script>

<div style="max-width: 1440px; margin: auto;">
  <div style="display: grid; grid-template-rows: repeat({Object.entries(attacks_2).length }); grid-template-columns: repeat({Object.entries(attacks_2.mug).length }); overflow-x: scroll; grid-gap: 5px;">
    {#each Object.entries(attacks_2) as [item, labels], row_index}
      {#each Object.entries(labels) as [label, results], col_index}
        <div style="display: flex; flex-direction: row; border-radius: 6px; overflow: hidden; width: fit-content; height: 174px; border: 1px solid #EEE; grid-column: {col_index + 1 }">
          <div style="border-right: 1px solid #EEE">
            <img style="width: 174px;" src="{results.image_url }?cache=26" />
          </div>
          <div>
            {#each results.zero_shot_statistics as probability}
              <div style="border-bottom: 1px solid #EEE; background-color: hsla(40, { trueLabels[item].includes(probability[1]) ? "0%" : "70%" } , 50%, { probability[0]}); color: #{probability[0] < 0.5 ? "000000" : "FFFFFF" }; padding: 0px 10px; line-height: 16px; width: 150px; font-size: 80%">
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

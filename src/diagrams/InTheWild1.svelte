<style>
    .figure-anchor {
        font-weight: bold;
    }
</style>

<script>

let data = require("../../static/typographic/in_the_wild_1.json");
</script>

  <div style="max-width: 1200px; margin: auto;">
    <div style="display: grid; grid-template-rows: repeat({ Object.entries(data).length}); grid-template-columns: repeat({ Object.entries(data.mug).length}); overflow-x: scroll; grid-gap: 10px;">
      {#each Object.entries(data.mug) as [label, results], col_index}
        <h4 style="grid-column: { col_index + 1}; margin-bottom: 0px">{@html label === "blank" ? "Blank" : "Labeled &ldquo;" + label + "&rdquo;" }</h4>
      {/each}
      {#each Object.entries(data) as [item, labels], row_index}
        {#each Object.entries(labels) as [label, results], col_index}
        <div style="display: flex; flex-direction: row; border-radius: 6px; overflow: hidden; width: fit-content; height: 121px; border: 1px solid #EEE; grid-column: { col_index + 1}">
          <div style="border-right: 1px solid #EEE">
            <img style="width: 121px;" src="{ results.image_url}?cache=1006" />
          </div>
          <div>
            {#each results.zero_shot_statistics as probability}
              <div style="border-bottom: 1px solid #EEE; background-color: hsla(40, 70%, 50%, { probability[0]}); color: #{ probability[0] < 0.5 ? "000000" : "FFFFFF"}; padding: 0px 10px; line-height: 16px; width: 145px; font-size: 80%">
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
        <b>Physical typographic attacks.</b> These twelve images were constructed as a black-box attack: they were photographed <i>without</i> consulting the multimodal model for vulnerable neurons first.
      </p>

      <p>
        Not all of the attacks are effective, but the plant pot labeled "laptop", the glass labeled "laptop", and the mug labeled "cup" all achieve surprising efficacy.
      </p>

      <p>
        Probabilities here calculated using the <b>zero-shot</b> methodology: we convert the multimodal model to an ImageNet classifier by calculating probabilities on the completion “a photo of a ___” for each ImageNet class.
      </p>
    </div>
  </div>

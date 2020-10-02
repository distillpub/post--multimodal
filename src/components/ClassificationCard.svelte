<script>
export let imageUrl, imageAltText, probabilities, customHues;

function backgroundColor(probability, imagenetClass, customHues) {
  return `hsla(
    ${
      imagenetClass in customHues ? customHues[imagenetClass] : 0
    },
    ${
      imagenetClass in customHues ? "70%" : "0%"
    },
    50%,
    ${probability}
  )`;
}

function calculateImageSize(probabilities) {
  return Math.round(probabilities.length * 17.5 - 1.5);
}

</script>

<div style="display: flex; flex-direction: row; border-radius: 6px; overflow: hidden; width: fit-content; height: {calculateImageSize(probabilities)}px; border: 1px solid #EEE;">
  <div style="border-right: 1px solid #EEE">
    <img style="width: {calculateImageSize(probabilities)}px;" src="{imageUrl}?cache=26" alt="{imageAltText}"/>
  </div>
  <div>
    {#each probabilities as [probability, imagenetClass]}
      <div style="
        border-bottom: 1px solid #EEE;
        background-color: {backgroundColor(probability, imagenetClass, customHues)};
        color: #{ probability < 0.7 ? "000000" : "FFFFFF"}; padding: 0px 10px; line-height: 16px; width: 190px; font-size: 80%">
        <small>{imagenetClass}
          <span style="float: right;">{Math.round(probability * 10000) / 100 }%</span>
        </small>
      </div>
    {/each}
  </div>
</div>

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
    ${
      imagenetClass in customHues ? "50%" : "60%"
    },
    ${probability}
  )`;
}

function calculateImageSize() {
  return Math.round(probabilities.length * 18 - 1);
}

function calculateBorderColor() {
  let bestLabel = probabilities.reduce((output, pair) => (pair[0] > output[0]) ? pair : output, [0.0, null]);

  if (Object.keys(customHues).includes(bestLabel[1])) {
    return `hsla(${customHues[bestLabel[1]]}, 70%, 50%, 1)`;
  } else {
    return "#EEE";
  }
}

</script>

<div style="display: flex; flex-direction: row; border-radius: 6px; overflow: hidden; width: fit-content; height: {calculateImageSize()}px; border: 1px solid {calculateBorderColor()};">
  <div style="border-right: 1px solid #EEE">
    <img style="width: {calculateImageSize()}px;" src="{imageUrl}?cache=26" alt="{imageAltText}"/>
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

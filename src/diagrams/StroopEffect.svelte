<style>
  .container {
    max-width: 270px;
    display: grid;
    grid-template-columns: [caption-start] auto [red] 50px [green] 50px [caption-start blue] 50px auto [caption-end];
    grid-template-rows: [caption] auto ;
    grid-gap: 8px;
  }
  .color-text {
    grid-row: text;
    font-size: 80%;
    line-height: 100%;
    grid-column: var(--color);
    color: var(--color);
  }
  .color-square {
    grid-row: color;
    width: 100%;
    max-width: 40px;
    height: 100%;
    grid-column: var(--color);
    background:  var(--color);
    border-radius: 4px;
    opacity: 0.6;
  }
  .container .figcaption {
    grid-area: caption;
    margin-bottom: 0px;
  }
</style>

<div class="container">

  <div class="figcaption">
    A common example of the <a href="https://en.wikipedia.org/wiki/Stroop_effect">Stroop effect</a> is that recognizing a 'mislabeled' color (eg. <span style="color:blue; opacity: 0.8;">green</span>, <span style="color: red; opacity: 0.8;">blue</span>, <span style="color:green; opacity: 0.8;">red</span>) is harder than normal. More generally, incogruent stimuli are slower and harder to recognize.
  </div>

</div>

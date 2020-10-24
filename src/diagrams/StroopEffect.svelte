<style>
  .container {
    max-width: 250px;
    display: grid;
    grid-template-columns: [caption-start red] 1fr [green] 1fr [caption-start blue] 1fr [caption-end];
    grid-template-rows: [caption] auto [text] auto [color] 16px;
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
    max-width: 50px;
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
    <b><a href="https://en.wikipedia.org/wiki/Stroop_effect">The Stroop effect</a></b>: recognizing a color is harder if it is incongruent with a word.
  </div>

  <div class="color-text" style="--color: red;">blue</div>
  <div class="color-text" style="--color: blue;">green</div>
  <div class="color-text" style="--color: green;">red</div>

  <div class="color-square" style="--color: red;"></div>
  <div class="color-square" style="--color: blue;"></div>
  <div class="color-square" style="--color: green;"></div>


</div>

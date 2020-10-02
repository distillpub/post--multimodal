<script>
const one_example_attack = require("../../static/typographic/one_example_attack.json");
</script>

<figure class="fullscreen-diagram" style="grid-column: screen; margin-bottom: 0px">
<div style="width: fit-content; margin: auto; display: grid; grid-template-columns: 405px auto 405px; grid-gap: 32px;">
  <div style="display: flex; flex-direction: row; border-radius: 6px; overflow: hidden; width: fit-content; height: 191px; border: 1px solid #EEE; grid-column: 1">
    <div style="border-right: 1px solid #EEE">
      <img style="width: 191px;" src="/typographic/small_attacks/example_before.png" alt="a picture of a chihuahua"/>
    </div>
    <div>
      {#each one_example_attack.control[0].slice(0,7) as pair}
        <div style="border-bottom: 1px solid #EEE; background-color: rgba(0, 0, 0, { pair[0] }); color: #{ pair[0] < 0.5 ? "000000" : "FFFFFF" }; padding: 0px 10px; line-height: 25px; width: 190px; font-size: 80%">
          <small>{ pair[1] }
            <span style="float: right;">{ Math.round(pair[0] * 10000) / 100 }%</span>
          </small>
        </div>
      {/each}
    </div>
  </div>

  <div style="grid-column: 2; min-width: 100px;">
    <div style="display: flex; align-items: center; height: 100%;">
    <div style="">
      <div style='width:100%; height: 30px; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; margin: 4px'>
        <div style='grid-column: 1 / 3; grid-row: 1; border-bottom: solid 3px #888; margin-bottom: -1px; margin-right: 12px;'></div>
        <div style='grid-column: 2 / 3; grid-row: 1/3; display: flex;'>
          <div style='height:0px; width: 0px; border-bottom: solid 8px transparent; border-top: solid 8px transparent; border-left:10px solid  #888; margin: auto; margin-right: 2px;'> </div>
        </div>
      </div>
      <div class="figcaption" style="border: 1px solid #CCC; border-radius: 6px; padding: 4px 10px; background: #EEE; margin-bottom: 8px;">
        <div style="margin-bottom: 8px;">
          <div>Target class:</div>
          <div><code>pizza</code></div>
        </div>
        <div>
          <div>Attack text:</div>
          <div><i>pizza</i></div>
        </div>
      </div>
    </div>
    </div>
  </div>

  <div style="display: flex; flex-direction: row; border-radius: 6px; overflow: hidden; width: fit-content; height: 191px; border: 1px solid #EEE; grid-column: 3">
    <div style="border-right: 1px solid #EEE">
      <img style="width: 191px;" src="/typographic/small_attacks/example_after.png" alt="a picture of a chihuahua with the word 'pizza' overlaid eight times" />
    </div>
    <div>
      {#each one_example_attack.results.pizza.pizza.full_results[0].slice(0,7) as pair}
        <div style="border-bottom: 1px solid #EEE; background-color: rgba(0, 0, 0, { pair[0] }); color: #{ pair[0] < 0.5 ? "000000" : "FFFFFF" }; padding: 0px 10px; line-height: 25px; width: 190px; font-size: 80%">
          <small>{ pair[1] }
            <span style="float: right;">{ Math.round(pair[0] * 10000) / 100 }%</span>
          </small>
        </div>
      {/each}
    </div>
  </div>
  </div>
  <figcaption style="margin-bottom: 42px; grid-column: 1/4; grid-row: 2; max-width: 700px">
    <br/>
    <p><a class="figure-anchor" href="#attack-setup">Figure N:</a> An example of the simple automated attack setup for the target class <code>pizza</code> with the attack text <i>pizza</i>. Because the top class was changed to <i>pizza</i>, this example qualifies as changed to the target class.</p>
  </figcaption>
</figure>

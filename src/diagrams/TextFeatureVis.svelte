<script>

  var d3 = require("d3")
  var alignments = require('./corr.json');
  import {onMount} from 'svelte';
  import DotPages from "./DotPages.svelte";

  export let neuron;
  export let layername;
  export let model;

  var model_spatial_locs = {"contrastive_4x": 9, "contrastive_rn50": 7, "contrastive_v2": 7, "lm_v1": 9}

  let spatial_locations = model_spatial_locs[model];
  var width = 180
  var ds_width = (width/2) - 4
  let border = 5

  var image_size = 150
  var grid_width = image_size/spatial_locations
  var icon_width = ds_width
  var icon_border = image_size - icon_width

  $: page = 0;

  function dataset_examples_url(model, layername, neuron) {

    var prefix = "https://openai-clarity.storage.googleapis.com/encyclopedia/modelzoo/2020-07-25/" + model + "/lucid.text_feature_vis/_text_feature_vis/"
    var neuron_json = "end=" + 32*(Math.floor(neuron/32) + 1) + "&lm_penalty=0.0025&op=" + encodeURIComponent(layername) + "&start=" + 32*(Math.floor(neuron/32) ) 
    console.log(prefix + encodeURIComponent(neuron_json) + "/text_" + neuron + ".json")
    return prefix + encodeURIComponent(neuron_json) + "/text_" + neuron + ".json"

  }

  let val = null
  let text = null

  onMount(async () =>{
    (await 
      fetch(dataset_examples_url(model, layername, neuron))
      .then((response) => response.json()
      .then((data) => { 
        var v = []
        var t = []
        for (var i = 0; i < 16; i++) {
          v.push(data[data.length - i - 1][0])
          t.push(data[data.length - i - 1][1])
        }
        val = v
        text = t
      } ))
      )
  });  

</script>

<style>

.text {
  font-family: Source Code Pro;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: -0.225004px;
  margin: 0px;
  padding-top: 5px;
}

</style>

<div>
    <div style="display:flex;
                flex-flow:row wrap;
                position: relative;
                width:{width-16}px;
                height:{100-16}px;
                border-radius: 8px;
                border: 1px solid rgb(0,0,0,0.15);
                overflow:hidden;
                padding: 8px;
                background-color: #FAFAFA;
                margin: 0px 4px 0px 4px;">
      {#if text && val}
        {#each d3.range(2*page, 2*(page + 1) ) as i}
          <div class=text>
            {text[i].slice(15)}
          </div>
        {/each}
      {/if}
    </div>
    <DotPages width={width} numdots={8} bind:bind={page}/>
</div>

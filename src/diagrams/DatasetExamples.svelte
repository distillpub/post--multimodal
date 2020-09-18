<script>

  var d3 = require("d3")
  // var alignments = require('./corr.json');
  import {onMount} from 'svelte';
  import DotPages from "./DotPages.svelte";

  export let neuron;
  export let layername;
  export let model;

  var model_spatial_locs = {"contrastive_4x": 9, "contrastive_rn50": 7, "contrastive_v2": 7,  "contrastive_v1": 7, "lm_v1": 9}

  let spatial_locations = model_spatial_locs[model];
  var width = 180
  var ds_width = (width/2) - 4
  let border = 5

  var image_size = 150
  var grid_width = image_size/spatial_locations
  var icon_width = ds_width
  var icon_border = image_size - icon_width

  $: page = 0

  function dataset_examples_url(model, layername, neuron) {
    var prefix = "https://openai-clarity.storage.googleapis.com/encyclopedia/modelzoo/2020-07-25/" + model + "/lucid.dataset_examples/_dataset_examples/"
    var neuron_json = "dataset=twitter0&op=" + encodeURIComponent(layername)+ "/channel-" + neuron + ".json"
    return prefix + encodeURIComponent(neuron_json)
  }

  function from_key_twitter0(key) {
    return "https://storage.cloud.google.com/openai-clarity/encyclopedia/modelzoo/2020-03-12/model-independent/lucid.unpack_dataset/alec_twitter10_m%253A2.0.0-train-to-8388608/unpack_slice/" + key + ".jpg"
  }

  let urls = null
  let spatials = null

  onMount(async () =>{
    (await 
      fetch(dataset_examples_url(model, layername, neuron))
      .then((response) => response.json()
      .then((data) => { 
        var u = []
        var s = []
        for (var i = 0; i < 4*12; i++) {
          u.push(from_key_twitter0(data.urls[i]))
          s.push(data.spatials[i])
        }
        urls = u
        spatials = s
        console.log(data)
      } ))
      )
  });  



</script>

<style>

</style>

<div>
    <div style="display:flex;
                flex-flow:row wrap;
                position: relative;
                width:{width}px;
                height:{width}px;
                border-radius: 8px;
                border: 1px solid rgb(0,0,0,0.15);
                background-image: url('http://microscope.openai.com/transparency-indicator.png');
                overflow:hidden;
                margin: 0px 4px 0px 4px;">
      {#if urls}
        {#each d3.range(4*page, 4*(page+1)) as i}
          <div style="width:  {icon_width}px; 
                      height: {icon_width}px;
                      border: 1px solid rgba(0, 0, 0, 0.1);
                      border-radius: 0px;
                      margin: 1px;
                      overflow: hidden;
                      position: relative">
            <img style="position: relative;
                        width: {image_size}px;
                        height: {image_size}px;
                        left: {(-grid_width/2 + image_size/2 - icon_border/2 - image_size*(spatials[i] % spatial_locations)/spatial_locations)}px;
                        top: {(-grid_width/2 + image_size/2 - icon_border/2 - image_size*Math.floor(spatials[i]/spatial_locations)/spatial_locations)}px;"
                  src={urls[i]}>
          <div style="width: {grid_width}px;
                      height: {grid_width}px;
                      position: absolute;
                      top: {image_size/2- icon_border/2-grid_width/2}px;
                      left: {image_size/2- icon_border/2-grid_width/2}px;
                      border: 1px solid rgba(0, 0, 0, 0.1);
                      box-shadow: 0px 0px 14px 3px rgb(255, 255, 255, 0.5)"></div>


          </div>
        {/each}
      {/if}
    </div>
    <DotPages width={width} numdots={8} bind:bind={page}/>
</div>

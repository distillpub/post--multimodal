<script>

  var d3 = require("d3")
  // var alignments = require('./corr.json');
  import DotPages from "./DotPages.svelte";

  export let neuron;
  export let layername;
  export let model;
  export let objective = "channel"
  var width = 180

  function feature_vis(model, layername, neuron) {
    var url_prefix = "https://openai-clarity.storage.googleapis.com/encyclopedia/modelzoo/2020-07-25/" + model + "/lucid.feature_vis/_feature_vis/"
    var query = "alpha=False&negative=False&objective=" + objective + "&op=" + encodeURIComponent(layername) + "&repeat=0&start=" + 32*Math.floor(neuron/32) + "&steps=4096&stop=" + 32*(Math.floor(neuron/32) + 1) + "/channel-" + neuron + ".png"
    var url = url_prefix + encodeURIComponent(query)
    return url
  }

</script>

<style>

</style>

<div>
    <div style="position: relative; width:{width}px; height:{width}px; border-radius: 8px; border: 0px solid black; overflow:hidden; margin: 0px 4px 0px 4px">
      <img 
        style="object-fit: scale;
               position: relative;
               width: 195px;
               height: 195px;
               left: -{(195-width)/2}px;
               top: -{(195-width)/2}px"
        src = {feature_vis(model, layername, neuron)} alt="">
      <span style="position:absolute;
                   display: inline-block;
                   left:0px;
                   top: 0px;
                   line-height: 20px;
                   background-color: rgb(255, 255, 255, 0.6);
                   border-radius: 0px 0px 8px 0px;
                   font-size:10px;
                   padding: 0px 5px 0px 5px;">
        Unit {neuron}
      </span>
    </div>
    <DotPages width={width} numdots={4}/>

</div>

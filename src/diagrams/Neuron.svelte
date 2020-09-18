
<script>

  import FeatureVis from "./FeatureVis.svelte";
  import DatasetExamples from "./DatasetExamples.svelte";
  import TextFeatureVis from "./TextFeatureVis.svelte";

  // var alignments = require('./corr_7.json');
  var alignment = alignments[4]
  var width = 200


  var x = [ 901,  737,  277,  476,  196, 1556,  218, 1564,  587, 1822, 1669,
       1651, 2128,  152,  232, 2027, 1826,  828, 2259, 1724,  863,  709,
       2036, 1137, 1782,  953,  718, 2034,  907, 1523, 1565, 2352,  655,
       1636,  543, 1745, 1210, 2504,  657, 2276,  212,  262]
 // [1144, 1032, 1478,  540, 1118, 1571,   36, 1369, 1340, 1749,  398,
  //       138, 1448,  671,  955, 1500,  248,   42,  560, 1856]]
    // [1765, 1179, 1664, 1253, 2175, 2418, 1378, 1543, 2337,  931,   43,
    //         244, 1413,  373, 2010, 1073, 2542,  774, 2536, 2163]
</script>

<style>

</style>

<!-- {#each alignments.slice(0,80) as alignment}
  <div style="display:flex; width: 50%">
    {#each alignment as data}
    <div style="padding-top: 50px">
      <div style="padding: 3px">{data[0]}</div>
      <FeatureVis model={data[0]} layername={data[1]} neuron={data[2]}/>
      <DatasetExamples model={data[0]} layername={data[1]} neuron={data[2]}/>
      <TextFeatureVis model={data[0]} layername={data[1]} neuron={data[2]}/>
    </div>
    {/each}
  </div>
{/each} -->



<div style="display:flex; flex-flow:row wrap; width: 100%;">
  {#each x as i}
    <div style="width: 190px;  padding-top: 30px">
      <FeatureVis model={"contrastive_4x"} layername={"image_block_4/5/Add_6:0"} neuron={i}/>
      <DatasetExamples model={"contrastive_4x"} layername={"image_block_4/5/Add_6:0"} neuron={i}/>
      <TextFeatureVis model={"contrastive_4x"} layername={"image_block_4/5/Add_6:0"} neuron={i}/>
    </div>
  {/each}
</div>

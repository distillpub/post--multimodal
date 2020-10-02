
<script>

let width = 50

</script>
<!-- 
<style>

</style> -->

<div style="display:flex; flex-flow:row wrap; width: 700px; margin: auto;">
<table style="width: 100%; padding-bottom:3px"><thead>
    <th></th>
    <th style="font-size:16px; font-weight: 400" colspan="2">RN50 (A)</th>
    <th style="font-size:16px; font-weight: 400" colspan="2">RN50 (B)</th>
    <th style="font-size:16px; font-weight: 400" colspan="2">RN101</th>
    <th style="font-size:16px; font-weight: 400" colspan="2">RN50 4x </th>
    <th style="font-size:16px; font-weight: 400" colspan="2">RN50 16x</th>
  </thead>

  <tbody>

  {#each [1,2,3,4,5,6,7] as i}

  <tr>
    <td>
      kansas
    </td>

    {#each [1,2,3,4,5] as i}
      <td title="" style="width: 40px; padding-top:10px; padding-bottom:10px">
<!--         <div style="border-radius: 3px">
          <img style="width:70px; padding-top: 7px;"
          src="https://openai-clarity.storage.googleapis.com/encyclopedia/modelzoo/2020-07-25/contrastive_rn50/lucid.feature_vis/_feature_vis/alpha%3DFalse%26negative%3DFalse%26objective%3Dchannel%26op%3Dimage_block_4%252F2%252FAdd_6%253A0%26repeat%3D1%26start%3D0%26steps%3D4096%26stop%3D32/channel-0.png" width=70 height = 70 />
        </div> -->

      <div style="position: relative; width:{width}px; height:{width}px; border-radius: 3px; border: 0px solid black; overflow:hidden; margin: 0px 4px 0px 4px">
        <img 
          style="object-fit: scale;
                 position: relative;
                 width: 195px;
                 height: 195px;
                 left: -{(195-width)/2}px;
                 top: -{(195-width)/2}px"
          src ="https://openai-clarity.storage.googleapis.com/encyclopedia/modelzoo/2020-07-25/contrastive_rn50/lucid.feature_vis/_feature_vis/alpha%3DFalse%26negative%3DFalse%26objective%3Dchannel%26op%3Dimage_block_4%252F2%252FAdd_6%253A0%26repeat%3D1%26start%3D0%26steps%3D4096%26stop%3D32/channel-0.png" alt="">
      </div>

      </td>
      <td>
        <div>
        <a target="_blank" href="" style="position:relative; left: -8px">1235</a>
        </div>
      </td>
    {/each}

  </tr>
  
  {/each}

</tbody>

</table>
</div>

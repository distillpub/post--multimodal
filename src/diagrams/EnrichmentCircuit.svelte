

<script>
    let units = [0,1,2];
</script>

<style>
.arrow-container { --arrow-color: #AAA; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;}
.arrow-swoop { grid-column: 2 / 3; grid-row: 1; border-bottom: solid 2px #AAA; border-left: 2px solid #AAA; border-radius: 0px 0px 0px 16px; margin-bottom: -1px; margin-right: 4px;}
.arrow-line {grid-column: 1 / 3; grid-row: 1; border-bottom: solid 2px #AAA; margin-bottom: -1px; margin-right: 4px;}
.arrow-head { height:0px; width: 0px; border-bottom: solid 5px transparent; border-top: solid 5px transparent; border-left: 8px solid var(--arrow-color); margin: auto; margin-right: 0px;}
.circuit {
    display: grid;
    grid-gap: 4px;
    margin: auto; 
    width: fit-content;
    grid-template-columns: [orig] 80px repeat(3, [gapA] minmax(auto, 60px) [residual] 80px [gapB] minmax(auto, 60px) [add] 80px) [gapA] minmax(auto, 60px) [residual] 80px [gapB] minmax(auto, 60px) [add];
    grid-template-rows: [upper-text-overflow-start] auto [residual] 80px [add] 80px auto [bottom-text-end catpion] auto;
}
.unit {
    width: auto;
    height: auto;
    background: #AAA;
    border-radius: 4px;
}
</style>




<div class='circuit'>
    <div class='unit' style='grid-column: orig; grid-row:add;'></div>
    <div class='figcaption' style='grid-column: gapA 1 / add 1; grid-row: add / bottom-text-end; margin-left: 8px; margin-right: 24px; margin-top: 55px;'>The abstract features we saw in the previous</div>
    {#each units as unit}
    <div class='unit' style='grid-column: residual {unit+1}; grid-row:residual;'></div>
    <div class='figcaption' style='grid-column: gapB {unit+1} / residual {unit+2}; grid-row:upper-text-overflow-start / add; margin-left: 8px; margin-right: 24px; margin-bottom: 24px;'>The abstract features we saw in the previous</div>
    <div class='unit' style='grid-column: add {unit+1}; grid-row:add;'></div>
    <div class='figcaption' style='grid-column: gapA {unit+2} / add {unit+2}; grid-row: add / bottom-text-end; margin-left: 8px; margin-right: 24px; margin-top: 55px;'>The abstract features we saw in the previous</div>
    <div class='arrow-container' style='grid-column: gapA {unit+1} / add {unit+1}; grid-row: add;'>
        <div class='arrow-line'></div>
        <div class='arrow-swoop'> </div>
            <div style='grid-column: 2 / 3; grid-row: 1/3; display: flex;'>
                <div class='arrow-head'> </div>
        </div>
    </div>
    {/each}
    <div class='figcaption' style='grid-row: caption; grid-column: 1/6; margin-top: 32px;'>
        <b>TODO(@colah):</b> Example enrichment circuit diagram</div>
</div>
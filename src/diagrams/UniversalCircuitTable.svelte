
<script>
    let models = ["InceptionV1", "MultimodalLM", "MultimodalV1", "MultimodalRN50", "MultimodalRN101", "Multimodal4x"];
    let model_labels = [
        {"header": "ImageNet", "sub": "InceptionV1"},
        {"header": "Multimodal", "sub": "Language Model"},
        {"header": "Multimodal", "sub": "RN50 1x (A)"},
        {"header": "Multimodal", "sub": "RN50 1x (B)"},
        {"header": "Multimodal", "sub": "RN50 2x"},
        {"header": "Multimodal", "sub": "RN50 4x"}
    ];
    let circuit_labels = [
        {"header": "High-Low Frequency Detectors", "sub": "Units detecting transitions from high to low frequency (<a href='https://distill.pub/2020/circuits/early-vision/#group_mixed3a_high_low_frequency'>read more</a>)." },
        {"header": "B/W vs Color Detectors", "sub": "Units detecting transitions from the absence and presence of color (<a href='https://distill.pub/2020/circuits/early-vision/#group_mixed3a_bw_vs_color'>read more</a>)." }
    ];
    let circuits = [0,1];
    let inputs = [0,1];
    let outputs = [0,1,2,3];
    let data = require("../../static/diagram-data/UniversalCircuits.json");
    console.log(data[0]);
</script>

<style>
    #outer-grid {
        display: grid;
        margin: auto; 
        width: fit-content;
        grid-row-gap: 16px;
        grid-column-gap: 32px;
    }
    .input-arrow::before, .output-arrow::before {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 110%;
        line-height: 100%;
        width: 100%;
        height: 100%;
        color: #777;
    }
    .circuit {
        display: grid;
        grid-gap: 4px;
        margin-bottom: 16px;
    }
    .weight, .input-neuron, .output-neuron {
        width: 100%;
        height: 100%;
        border-radius: 2px;
        background: #AAA;
        border: 1px solid #AAA;
    }
    .weight { 
        image-rendering: pixelated;
    }
    .label-header {
        line-height: 120%; 
        margin-bottom: 4px; 
    }


    .model-title             { --C: header; }
    .circuit-title, .circuit { --C: circuit calc( 1 + var(--circuit) ); }
    .circuit-title           { --D: header; }
    .model-title,   .circuit { --D: model calc( 1 + var(--model) );  }
    
    .input-arrow                           { --A: arrow; }
    .output-arrow                          { --B: arrow; }
    .input-neuron                          { --A: input; }
    .output-neuron                         { --B: output; }
    .input-neuron, .input-arrow, .weight   { --B: main calc( 1 + var(--input ) ); }
    .weight, .output-arrow, .output-neuron { --A: main calc( 1 + var(--output) ); }

    
    @media only screen and (max-width: 1250px) {
        #outer-grid {
            grid-template-columns: [header] 100px repeat(2, [circuit] auto);
            grid-template-rows: [header] auto repeat(6, [model] auto);
        }
        #outer-grid > div {grid-column: var(--C); grid-row: var(--D)}

        .input-arrow::before  { content: "→"; }
        .output-arrow::before { content: "↓"; }

        .circuit {
            grid-template-rows: repeat(2, [main] 40px) [arrow] 16px [output] 40px;
            grid-template-columns: [input] 40px [arrow] 16px repeat(4, [main] 40px) ;
        }
        .circuit div {grid-column: var(--A); grid-row: var(--B)}

        .circuit-title {max-width: 270px;}
    }

    @media only screen and (min-width: 1250px) {
        #outer-grid {
            grid-template-rows: [header] auto repeat(2, [circuit] auto);
            grid-template-columns: [header] 100px repeat(6, [model] auto);
        }
        #outer-grid > div {grid-column: var(--D); grid-row: var(--C)}

        .input-arrow::before  { content: "↓"; }
        .output-arrow::before { content: "→"; }

        .circuit {
            grid-template-columns: repeat(2, [main] 40px) [arrow] 16px [output] 40px;
            grid-template-rows: [input] 40px [arrow] 16px repeat(4, [main] 40px) ;
        }
        .circuit div {grid-column: var(--B); grid-row: var(--A)}
    }


</style>

<div id='outer-grid'>
    {#each model_labels as label, model}
    <div class='model-title' style='--model: {model};'>
        <div class='label-header'>{label.header}</div>
        <div class='figcaption'>{@html label.sub}</div>
    </div>
    {/each}
    {#each circuit_labels as label, circuit}
    <div class='circuit-title' style='--circuit: {circuit};'>
        <div class='label-header'>{label.header}</div>
        <div class='figcaption'>{@html label.sub}</div>
    </div>
    {/each}
    {#each models as _, model} {#each circuits as circuit}
    <div class='circuit' style='--model: {model}; --circuit: {circuit}'>

        {#each outputs as output}
        <div class='output-neuron' style='--output: {output}; background: url({data[circuit][model]["outputs"][output]}); background-repeat: no-repeat;
        background-size: cover;'></div>
        {/each}
        {#each inputs as input}
        <div class='input-neuron' style='--input: {input}; background: url({data[circuit][model]["inputs"][input]}); background-repeat: no-repeat;
        background-size: cover;'></div>
        {/each}
        {#each inputs as input} {#each outputs as output}
        <div class='weight' style='--input: {input}; --output: {output}; background: url({data[circuit][model]["weights"][input][output]}); background-repeat: no-repeat;
        background-size: cover;'></div>
        {/each}{/each}
        
        {#each inputs as input}
        <div class='input-arrow' style='--input: {input};'></div>
        {/each}
        {#each outputs as output}
        <div class='output-arrow' style='--output: {output};'></div>
        {/each}
    </div>
    {/each}{/each}
</div>
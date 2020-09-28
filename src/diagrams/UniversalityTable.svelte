
<style>
    @media only screen and (min-width: 1400px) {
        .table {
            grid-gap: 12px;
            grid-template-columns: [category] 160px [label] 160px repeat(7, [main] 122px);
        }
    }
    @media only screen and (max-width: 1399px){
        .table {
            display: grid;
            grid-column-gap: 12px;
            grid-template-columns: [category] 120px [label] 100px repeat(7, [main] 80px);
        }
    }
    .table {
        display: grid;
        grid-row-gap: 16px;
        grid-template-rows: [category] auto [label] auto repeat(6, [main] auto) [caption] auto;
    }
    .feature-box {
        display: flex; flex-wrap: wrap; grid-gap: 2px; align-content: start;
    }
    .feature-box a {
        border-bottom: none; text-decoration: none;
        display: block;
    }
    .feature-box img {
        width: 60px; height: 60px; background: #AAA; border-radius: 4px; object-fit: none;
        display: block;
    }


    .figure-anchor {
        font-weight: bold;
    }
</style>

<script>
    let {columnTitles, rowTitles, rows} = require("../../static/diagram-data/Universality.json")
</script>

    
<div style='margin: auto; width: fit-content;'>
<div class='table'>

    <!--
    <div style='grid-column-start:3; grid-column-end: 5; grid-row:1; padding-bottom: 8px; border-bottom: 1px solid #CCC;'>
    Specific Task Models
    <div class='figcaption'>These models share some features, but have many high-level features they don't share.</div>
    </div>
    <div style='grid-column-start:5; grid-column-end: 9; grid-row:1; padding-bottom: 8px; border-bottom: 1px solid #CCC;'>
    Multimodal Models
    <div class='figcaption' style='max-width: 340px;'>These models seem to union over narrower models, containing many of their features.</div>
    </div>-->

    {#each columnTitles as column, i}
    <div style='grid-column: main {i+1}; grid-row: label; padding-bottom: 8px; /*border-bottom: 1px solid #CCC;*/'>
        {column.header}
        <div class='figcaption'>{column.sub}</div>
    </div>
    {/each}


    {#each rows as row, j}
    <div style='grid-column: label; grid-row: main {j+1}; padding-right: 10px;'>
        <div style='line-height: 120%; margin-bottom: 8px;'>{row.name}</div>
        <div class='figcaption'>{row.description}</div>
    </div>
    {#each row.model_features as features, i}
    {#if features.length == 0}
    <div style='grid-column: main {i+1}; grid-row: main {j+1}; background: #EEE; border-radius: 2px; ' class="feature-box">
        <div class="figcaption" style='margin:auto; margin: 4px; margin-top: 24px; max-width: 120px; opacity: 0.7;'>No correlated features.</div>
    </div>
    {:else}
    <div style='grid-column: main {i+1}; grid-row: main {j+1};' class="feature-box">
        {#each features as feature}
        <a href="{feature.a_url}" >
        <img src='{feature.img_url}' alt='{feature.model} {feature.layer}:{feature.unit}'>
        </a>
        {/each}
    </div>
    {/if}
    {/each}
    {/each}

    <div style='grid-column: category; grid-row-start: main 1; grid-row-end: main 3; padding-right: 16px; margin-right: 16px; border-right: 1px solid #CCC;'>
        <div style='line-height: 120%; margin-bottom: 8px;'>Universal Features</div>
        <div class='figcaption'>Features which are shared across ImageNet, Places365, im2gps and Multimodal models.</div>
    </div>
    <div style='grid-column: category; grid-row-start: main 3; grid-row-end: main 5; padding-right: 16px; margin-right: 16px; border-right: 1px solid #CCC;'>
        <div style='line-height: 120%; margin-bottom: 8px;'>Multimodal + One Other Model</div>
        <div class='figcaption'>Features which are shared across ImageNet, Places365, im2gps and Multimodal models.</div>
    </div>
    <div style='grid-column: category; grid-row-start: main 5; grid-row-end: main 6; padding-right: 16px; margin-right: 16px; border-right: 1px solid #CCC;'>
        <div style='line-height: 120%; margin-bottom: 8px;'>Multimodal Only</div>
        <div class='figcaption'>Features which found in Multimodal models, but not ImageNet, Places365, or im2gps.</div>
    </div>

    <div style='margin-top:16px; max-width: 784px; grid-row: caption; grid-column: main 1 / main 5;' class="figcaption">
        <a class="figure-anchor" href="#universality-diagram">Figure N:</a>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>

</div>

</div>


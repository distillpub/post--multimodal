
<script>import { facet_icon_url, microscope_url } from "../urls";


let families = [

    {
        title: "Region Neurons",
        description: "See <a href=\"#region-neurons\">Region Neurons</a>.",
        neurons: [
            {"model": "4x", "unit": 862, title: "USA", "facet": "any"},
            {"model": "4x", "unit": 218, title: "Europe", "facet": "any"},
            {"model": "4x", "unit": 1067, title: "India", "facet": "any"},
            {"model": "4x", "unit": 1257, title: "West Africa?", "facet": "any"},
            {"model": "4x", "unit": 513, title: "Australia", "facet": "any"},
        ]
    },

    {
        title: "Person Neurons",
        description: "See <a href=\"#person-neurons\">Person Neurons</a>.",
        neurons: [
            {model: "4x", unit: 89, title: "Donald Trump", facet: "face" },
            {model: "4x", unit: 1063, title: "Elvis Presley", facet: "face" },
            {model: "4x", unit: 263, title: "Lady Gaga", facet: "face" },
            {model: "4x", unit: 2233, title: "Ariana Grande", facet: "face" },
            {model: "4x", unit: 1777, title: "Jesus Christ", facet: "face" },
        ]
    },
    {
        title: "Emotion Neurons",
        description: "See <a href=\"#emotion-neurons\">Emotion Neurons</a>.",
        neurons: [
            {model: "4x", unit: 2478, title: "shocked", facet: "face" },
            {model: "4x", unit: 1193, title: "crying", facet: "face" },
            {model: "4x", unit: 1512, title: "happy", facet: "face" },
            {model: "4x", unit: 91, title: "sleepy", facet: "face" },
            {model: "4x", unit: 2049, title: "serious", facet: "face" },
        ]
    },


    {
        title: "Religions",
        description: "These neurons respond to concept clusters associated with a specific religion, such as its imagery, iconography, traditions, and/or texts.",
        neurons: [
            {model: "4x", unit: 479, title: "Islam?", facet: "logo" }, // or 1860
            {model: "4x", unit: 929, title: "Judaism", facet: "any" },
            {model: "4x", unit: 291, title: "Hinduism", facet: "any" },
            {model: "4x", unit: 293, title: "Catholicism", facet: "any" },
            // 1777 might be thought of as a Christianity neuron insteead of a people neuron. Top words:  christ, churches, baptist, gospel, ministries, christianity, theology, jesus, pray, christians, praise, church, pastor, prayer, biblical, salvation, worship, jerusalem, christian, bible
            // Budhism wasn't in top words???
            {model: "4x", unit: 1376, title: "Bible", facet: "any" },
        ]
    },

    {
        title: "Person Trait Neurons",
        description: "These neurons detect gender<d-footnote>By this, we mean both that it responds to people presenting as this gender, as well as that it responds to concepts associated with that gender.</d-footnote> and age, as well as facial features like mustaches. (Ethnicity tends to be represented by regional neurons.)",
        neurons: [
            {model: "4x", unit: 2231, title: "teenage", facet: "logo" },
            {model: "4x", unit: 839, title: "elderly", facet: "indoor" },
            {model: "4x", unit: 2518, title: "female", facet: "face" },
            {model: "4x", unit: 320, title: "male", facet: "face" },
            {model: "4x", unit: 92, title: "mustache", facet: "face" },
            { model: "rn101", unit: 942, title: "baby", facet: "any", },
        ]
    },

    {
        title: "Image Type Neurons",
        description: "These neurons detect different ways in which an image might be drawn, rendered, or photographed, or different contexts in which an image might occur.",
        neurons: [
            {model: "4x", unit: 1308, title: "selfie", facet: "text" },
            {model: "rn101", unit: 1801, title: "mirror selfie", facet: "any" },
            {model: "rn101", unit: 2012, title: "headshot", facet: "any" },
            {model: "rn101", unit: 691, title: "portrait", facet: "any" },
            {model: "rn101", unit: 463, title: "FPS screenshot", facet: "any" },
            {model: "rn101", unit: 321, title: "cartoon", facet: "logo" },
            {model: "rn101", unit: 1717, title: "child's drawing", facet: "face" },
            {model: "rn101", unit: 1159, title: "Egyptian art", facet: "any" },
            {model: "rn101", unit: 306, title: "Roman art", facet: "face" },
            {model: "rn101", unit: 1227, title: "Buddhist art", facet: "any" },

        ]
    },

    {
        title: "Image Feature Neurons",
        description: "These neurons detect extraneous features that a photo might contain: photobombs and bunny ears, the heads of people seated in front of you at a lecture, Photoshopped modifications, and more.",
        neurons: [
            {model: "4x", unit: 1640, title: "altered image", facet: "text" },
            {model: "4x", unit: 2272, title: "bunny ears", facet: "any" },
            {model: "rn101", unit: 1471, title: "hoodie, cold", facet: "face" },
            {model: "rn101", unit: 1051, title: "crowd, vigil", facet: "logo" },
            {model: "rn101", unit: 227, title: "photobomb", facet: "any" },
        ]
    },

    {
        title: "Holiday Neurons",
        description: "These neurons recognize the names, decorations, and traditional trappings around a holiday.",
        neurons: [
            {model: "4x", unit: 2439, title: "Halloween", facet: "any" },
            {model: "4x", unit: 776, title: "Birthday", facet: "any" },
            {model: "4x", unit: 1326, title: "Christmas", facet: "any" },
            {model: "4x", unit: 1204, title: "Easter", facet: "any" },
            {model: "rn101", unit: 881, title: "Eid Mubarak", facet: "any" },
            {model: "rn101", unit: 865, title: "Christmas", facet: "any" },
        ]
    },

    {
        title: "Fictional Universe Neurons",
        description: "These neurons represent characters and concepts from within particular fictional universes.",
        neurons: [
            {model: "4x", unit: 924, title: "Pokémon", facet: "logo" },
            {model: "rn101", unit: 905, title: "Marvel", facet: "any" },
            {model: "rn101", unit: 2043, title: "Zelda", facet: "logo" },
            {model: "rn101", unit: 1532, title: "Star Wars", facet: "indoor" },
            {model: "rn101", unit: 789, title: "The Simpsons", facet: "logo" },
        ]
    },

    {
        title: "Brand Neurons",
        description: "Like the neurons that recognize the identities of people, these neurons recognize brand identities.",
        neurons: [
            {model: "rn101", unit: 2002, title: "Amazon", facet: "logo" },
            // {model: "rn101", unit: 1438, title: "Air Jordan", facet: "logo", },
            {model: "rn101", unit: 787, title: "Spotify", facet: "logo" },
            {model: "4x", unit: 1166, title: "Disney", facet: "indoor" },
            {model: "rn101", unit: 1284, title: "Real Madrid", facet: "any" },
            {model: "4x", unit: 1008, title: "NASA", facet: "any" },
            // { model: "rn101", unit: 1929, title: "NASA", facet: "any", },
        ]
    },

    {
        title: "Typographic Neurons",
        description: "Surprisingly, despite being able to “read” words and map them to semantic features, the model keeps a handful of more typographic features in its high-level representations. Like a child spelling out a word they don’t know, we suspect these neurons help the model represent text it can’t fully read.",
        neurons: [
            {model: "4x", unit: 2504, title: "\"un-\"", facet: "text" },
            {model: "4x", unit: 656, title: "\"con-\"", facet: "text" },
            {model: "4x", unit: 444, title: "\"-oo-\"", facet: "text" },
            {model: "4x", unit: 2524, title: "\"-ing\"", facet: "text" },
            {model: "4x", unit: 399, title: "\"j-\"", facet: "text" },
        ]
    },

    {
        title: "Abstract Concept Neurons",
        description: "Finally, many of the neurons in the model contribute to recognizing an incredible diversity of abstract concepts that cannot be cleanly classified into the above categories.",
        neurons: [
            { model: "4x", unit: 371, title: "you", facet: "text" },
            { model: "4x", unit: 1883, title: "I / me", facet: "text" },
            { model: "rn101", unit: 696, title: "heart", facet: "any" },
            { model: "rn101", unit: 222, title: "math", facet: "any" },
            { model: "rn101", unit: 926, title: "self-care", facet: "any" },
            // { model: "rn101", unit: 878, title: "dice", facet: "any" },
            { model: "4x", unit: 1820, title: "LGBTQ+", facet: "face" },
            { model: "rn101", unit: 1110, title: "star", facet: "any" },
            { model: "rn101", unit: 1047, title: "smart", facet: "any" },
            { model: "rn101", unit: 1006, title: "temperature", facet: "text" },
            { model: "rn101", unit: 1049, title: "theatre", facet: "logo" },
            { model: "rn101", unit: 480, title: "past tense", facet: "text" },

        ]
    },

    {
        title: "Counting Neurons",
        description: "These neurons detect duplicates of the same person or thing, and can distinguish them by their count.",
        neurons: [
            {model: "4x", unit: 17, title: "trios", facet: "indoor" },
            {model: "4x", unit: 202, title: "pairs or fours", facet: "any" },
            {model: "4x", unit: 310, title: "many", facet: "face" },
        ]
    },
    {
        title: "Time",
        description: "These neurons respond to any visual information that contextualizes the image in a particular time – for some it's a season, for others it's a day or a month or a year, and for yet others it may be an entire era.",
        neurons: [
            {model: "rn101", unit: 1979, title: "morning", facet: "any" },
            {model: "4x", unit: 2364, title: "summer", facet: "logo" },
            {model: "4x", unit: 1829, title: "winter", facet: "logo" },
            {model: "4x", unit: 1714, title: "day", facet: "logo" },
            {model: "4x", unit:  705, title: "month", facet: "logo" },
            {model: "4x", unit:  764, title: "year", facet: "logo" },
            {model: "4x", unit: 2403, title: "mid-1900s", facet: "any" },
            {model: "4x", unit: 56, title: "historical", facet: "any" },
            {model: "", unit: 0, title: "", facet: "any" },
            {model: "", unit: 0, title: "", facet: "any" },
        ]
    },

    // {
    //     title: "",
    //     description: "",
    //     neurons: [

    //     ]
    // }


];


let other_families = [

    {
        title: "",
        description: "",
        neurons: [
            {model: "", unit: 0, title: "", facet: "any" },
            {model: "", unit: 0, title: "", facet: "any" },
            {model: "", unit: 0, title: "", facet: "any" },
            {model: "", unit: 0, title: "", facet: "any" },
            {model: "", unit: 0, title: "", facet: "any" },
        ]
    },
]
</script>

<style>
    .container {
        width: fit-content;
        margin: auto;
    }
    .families {
        max-width: 1900px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 12px;
    }
    .family {
        width: 540px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid #CCC;
        background: #f4f4f7;
    }
    .family .family-title {
        font-weight: bold;
    }
    .family .neurons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 4px;
    }
    .family a.neuron {
        width: 100px;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #CCC;
    }
    .family .neuron .vis {
        width: 100px;
        height: 100px;
        display: block;
        background: #AAA;
    }
    .family .neuron .name {
        background: #E5E5E8;
        padding-left: 2px;
    }
    .family .neuron:hover {
        border: 1px solid #AAA;
    }
    .family .neuron:hover .name {
        background: #D0D0D6;
    }
    .family .reveal {
        line-height: 100%;
        height: 15px;
        cursor: pointer;
        opacity: 0.7;
    }
    .family .reveal:hover {
        opacity: 0.9;
        font-weight: bold;
    }
    .container > .figcaption {
        margin-top: 40px;
        max-width: 800px;
    }
</style>

<div class='container'>
<div class='families'>
    {#each families as family}
    <div class='family'>
        <div class='family-title'>{family.title}</div>
        <div class='neurons'>
            {#each family.neurons as neuron, neuron_i}
            {#if neuron_i < 5 || family.revealed}
            <a class='neuron' href="{microscope_url(neuron)}">
                <img class='vis' src="{facet_icon_url(neuron, neuron.facet)}" />
                <div class='name figcaption'>{neuron.title}</div>
            </a>
            {/if}
            {/each }
        </div>
        <div class="reveal figcaption" on:click={() => {family.revealed = !family.revealed;}}>
            {#if family.neurons.length > 5}
            {#if family.revealed}
            Hide {family.neurons.length-5} neurons.
            {:else}
            Show {family.neurons.length-5} more neurons.
            {/if}
            {/if}
        </div>
        <div class='description figcaption'>{@html family.description}</div>
    </div>
    {/each }
</div>
<div class="figcaption">
    <a href='#neuron-families' class='figure-anchor'>Figure N:</a> This diagram presents selected neurons from the final layer of four CLIP models, hand organized into "families" of similar neurons. Each neuron is represented by a feature visualization (selected from regular or <a>faceted feature visualization</a> to best illustrate the neuron) with human-chosen labels to help quickly provide a sense of each neuron. Labels were picked after looking at hundreds of stimuli that activate the neuron, in addition to feature visualizations.<br><br>

    You can click on any neuron to open it up in OpenAI Microscope to see feature visualizations, dataset examples that maximally activate the neuron, and more.
</div>
</div>

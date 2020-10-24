<script>
  import SmallNeuronGrid from './SmallNeuronGrid.svelte';
  let neurons = [
    {
      model: "4x",
      unit: 1640,
      title: "altered image",
      facets: ["text"],
    },
    {
      model: "4x",
      unit: 2272,
      title: "bunny ears",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 1471,
      title: "hoodie",
      facets: ["face"],
    },
    {
      model: "rn101",
      unit: 1051,
      title: "Crowd or vigil",
      facets: ["logo"],
    },
    {
      model: "rn101",
      unit: 227,
      title: "photobomb",
      facets: ["any"],
    },
  ];

/*
    {
      model: "rn101",
      unit: 1048,
      title: "photo of a photo",
      facets: ["indoor"],
    },
    {
      model: "rn101",
      unit: 2038,
      title: "bunnies and mice",
      facets: ["any", "indoor", "face", "logo", "text"],
    },
    {
      model: "rn101",
      unit: 1983,
      title: "video play button",
      facets: ["any", "indoor", "face", "logo", "text"],
    },
*/
</script>
<SmallNeuronGrid neurons={neurons} />

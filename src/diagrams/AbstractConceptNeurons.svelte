<script>
  import SmallNeuronGrid from './SmallNeuronGrid.svelte';
  let neurons = [
    {
      model: "4x",
      unit: 371,
      title: "you",
      facets: ["text"],
    },
    {
      model: "rn101",
      unit: 696,
      title: "heart",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 222,
      title: "math",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 926,
      title: "self-care",
      facets: ["any"],
    },
    /*{
      model: "rn101",
      unit: 878,
      title: "dice",
      facets: ["any"],
    },*/
    {
      model: "4x",
      unit: 1820,
      title: "LGBT pride",
      facets: ["face"],
    },
    {
      model: "rn101",
      unit: 1110,
      title: "star",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 1047,
      title: "smart",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 1006,
      title: "temperature",
      facets: ["text"],
    },
    {
      model: "rn101",
      unit: 1049,
      title: "theatre",
      facets: ["logo"],
    },
    {
      model: "rn101",
      unit: 480,
      title: "past tense",
      facets: ["text"],
    },
  ];
</script>
<SmallNeuronGrid neurons={neurons} />

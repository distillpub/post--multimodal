<script>
  import SmallNeuronGrid from './SmallNeuronGrid.svelte';
  let neurons = [
    {
      model: "rn101",
      unit: 2002,
      title: "Amazon",
      facets: ["logo"],
    },
    // {
    //   model: "rn101",
    //   unit: 1438,
    //   title: "Air Jordan",
    //   facets: ["logo"],
    // },
    {
      model: "rn101",
      unit: 787,
      title: "Spotify",
      facets: ["logo"],
    },
    {
      model: "4x",
      unit: 1166,
      title: "Disney",
      facets: ["indoor"],
    },
    {
      model: "rn101",
      unit: 1284,
      title: "Real Madrid",
      facets: ["any"],
    },
    {
      model: "4x",
      unit: 1008,
      title: "NASA",
      facets: ["any"],
    },
  /*{
      model: "rn101",
      unit: 1929,
      title: "NASA",
      facets: ["any"],
    },
*/

  ];
</script>
<SmallNeuronGrid neurons={neurons} />

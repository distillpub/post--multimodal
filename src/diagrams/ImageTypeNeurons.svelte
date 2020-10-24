<script>
  import SmallNeuronGrid from './SmallNeuronGrid.svelte';
  let neurons = [
    {
      model: "4x",
      unit: 1308,
      title: "selfie",
      facets: ["text"],
    },
    {
      model: "rn101",
      unit: 1801,
      title: "mirror selfie",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 2012,
      title: "headshot",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 691,
      title: "portrait",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 463,
      title: "FPS screenshot",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 321,
      title: "cartoon",
      facets: ["logo"],
    },
    {
      model: "rn101",
      unit: 1717,
      title: "child's drawing",
      facets: ["face"],
    },
    {
      model: "rn101",
      unit: 1159,
      title: "Egyptian art",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 306,
      title: "Roman art",
      facets: ["face"],
    },
    {
      model: "rn101",
      unit: 1227,
      title: "Buddhist art",
      facets: ["any"],
    },
  ];

/*    {
      model: "4x",
      unit: 127,
      title: "watching tv or a lecture",
      facets: ["indoor"],
    },
*/
</script>
<SmallNeuronGrid neurons={neurons} />

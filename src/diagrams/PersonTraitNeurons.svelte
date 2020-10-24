<script>
  import SmallNeuronGrid from './SmallNeuronGrid.svelte';
  let neurons = [
    // {
    //   model: "rn101",
    //   unit: 942,
    //   title: "baby",
    //   facets: ["any"],
    // },
    {
      model: "4x",
      unit: 2231,
      title: "teenage",
      facets: ["logo"],
    },
    {
      model: "4x",
      unit: 839,
      title: "elderly",
      facets: ["indoor"],
    },
    {
      model: "4x",
      unit: 2518,
      title: "female",
      facets: ["face"],
    },
    {
      model: "4x",
      unit: 320,
      title: "male",
      facets: ["face"],
    },
    {
      model: "4x",
      unit: 92,
      title: "mustache",
      facets: ["face"],
    },
  ];

/*
*/
</script>
<SmallNeuronGrid neurons={neurons} />

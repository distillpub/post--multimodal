<script>
    export let unit = 1;

    let neuron = {model: "4x", unit, name: "Default"};
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
</script>


<style>
.microscope-btn {
  border: none;
  background-color: #ae6ab4;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 5px;
}

.microscope-btn:hover {
  background-color: #a360a9;
}
.microscope-btn:active {
  background-color: #B974BF;
}
</style>



<div style="display: inline-block;">
  <a
    href="{microscope_url(neuron)}"
    class="microscope-btn"
    target="_blank"
    title="View neuron {neuron.unit} ({neuron.model} model) in Microscope"
  >
    <svg viewBox="0 0 65.51 73.37" width="16px" height="18px" style="margin-bottom: -3px;"><path fill="white" d="M32.78,24.48a6.11,6.11,0,1,0-6.11-6.11A6.12,6.12,0,0,0,32.78,24.48ZM62.92,61.74H57.33l-2.38-6H21.15a.22.22,0,0,1-.36-.06.43.43,0,0,1-.08-.39l5.73-22.08a4.75,4.75,0,0,1,.44-.68l3.56,0,2.43-5.19,0,5.21v7.64a3,3,0,0,0,3,3h.17l1.75,3.72h5.49L45,43.17h.17a3,3,0,0,0,3-3V6.06a3,3,0,0,0-3-3L45.46,3,44.38,0H36.53L35.45,3l.25.07a3,3,0,0,0-3,3V9.83h.07a8.54,8.54,0,1,1-7.78,12H19.89L7.28,61.74H2.59L0,73.37H8s1.08-5.26,1.28-3.43H56.23c.2-1.83,1.28,3.43,1.28,3.43h8Z"></path></svg>
    ↗
  </a>
</div>

export function as_neuron(neuron) {
  if (typeof neuron === "number") {
    return { model: "4x", unit: neuron }
  }
  return neuron
}

export function as_facet(facet) {
  if (typeof facet === "string") {
    return { name: facet }
  }
  return facet
}

export function microscope_url(neuron) {
  neuron = as_neuron(neuron)
  let [model_slug, last_layer] = {
    rn50: ["contrastive_rn50", "image_block_4_2_Add_6_0"],
    v1: ["contrastive_v1", "image_block_4_2_Add_6_0"],
    rn101: ["contrastive_v2", "image_block_4_2_Add_6_0"],
    "4x": ["contrastive_4x", "image_block_4_5_Add_6_0"],
  }[neuron.model]
  let layer = neuron.layer || last_layer
  return `http://microscope-azure-edge.openai.com/models/${model_slug}/${layer}/${neuron.unit}`
}

export function map_url(neuron) {
  neuron = as_neuron(neuron)
  let model_slug = {
    v1: "v1_4_2",
    rn50: "rn50_4_2",
    rn101: "v2_4_2",
    "4x": "4x_4_5",
  }[neuron.model]

  return `http://storage.googleapis.com/distill-multimodal/multimodal-vis/maps_data/geographical/${model_slug}_${neuron.unit}.jpeg`
}

export function facet_icon_url(neuron, facet = "any", strength = 5) {
  neuron = as_neuron(neuron)
  strength = facet == "any" ? 0 : strength
  facet = as_facet(facet == "any" ? "text" : facet)
  let model_slug = {
    v1: "v1",
    rn50: "RN50",
    rn101: "RN101",
    "4x": "RN50_4x",
  }[neuron.model]

  var size = neuron.model == "4x" ? 128 : 64
  return `https://storage.googleapis.com/distill-multimodal/facets_multiscale/${neuron.unit}_${facet.name}_${model_slug}_${strength}_${size}.png`
  // return `https://storage.googleapis.com/clarity-public/ggoh/facets_hybrid_lessjitter/${neuron.unit}_${facet}_False_${model_slug}_64_${strength}.png`;
}

export function dataset_examples_url(neuron, facet = "any") {
  facet = as_facet(facet)
  neuron = as_neuron(neuron)
  return `https://storage.googleapis.com/distill-multimodal/multimodal-vis/facet-ds/4x/${neuron.unit}_${facet.name}.png`
}

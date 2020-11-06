import React, { useLayoutEffect, useRef } from 'react'
import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from './urls.js';

export function geo_ref(text, view=0, focus=null, map="geography") {
    return <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState(map, view, focus)}}>{text}</a>
}

export function mref(text, neuron) {
    return <a href={microscope_url(neuron)} dangerouslySetInnerHTML={{__html: text}} /> 
}
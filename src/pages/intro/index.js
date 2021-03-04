import React, { useState } from "react"
import { microscope_url } from "../../util_mdx.js"

import HallePhoto from "./images/halle-berry-photo-1.png"
import SpiderManPhoto1 from "./images/spider-man-photo-1.png"
import SpiderManPhoto2 from "./images/spider-man-photo-2.png"
import SpiderManPhoto3 from "./images/spider-man-photo-3.png"
import SpiderManPhoto4 from "./images/spider-man-photo-4.png"
import SpiderManPhoto5 from "./images/spider-man-photo-5.png"

import HumanPhoto from "./images/human-face-photo-1.png"

import HalleDrawing from "./images/halle-berry-drawing-1.png"
import SpiderManDrawing1 from "./images/spider-man-drawing-1.png"
import SpiderManDrawing2 from "./images/spider-man-drawing-2.png"
import SpiderManDrawing3 from "./images/spider-man-drawing-3.png"
import SpiderManDrawing4 from "./images/spider-man-drawing-4.png"
import SpiderManDrawing5 from "./images/spider-man-drawing-5.png"

import HalleText from "./images/halle-berry-text-1.png"
import SpiderManText1 from "./images/spider-man-text-1.png"
import SpiderManText2 from "./images/spider-man-text-2.png"
import SpiderManText3 from "./images/spider-man-text-3.png"
import SpiderManText4 from "./images/spider-man-text-4.png"
import SpiderManText5 from "./images/spider-man-text-5.png"

import Blank from "./images/blank.png"
import { isArray } from "lodash"

const Cell = ({ image, children, yes = true }) => {
  const [index, setIndex] = useState(0)
  const activeImage = isArray(image) ? image[index] : image

  return (
    <div
      style={{
        display: "flex",
        paddingTop: 10,
        paddingBottom: 10,
        flexFlow: "row",
      }}
    >
      <div>
        <img
          style={{
            borderRadius: 3,
            border: "1px solid rgba(0, 0, 0, 0.15)",
            imageRendering: "pixelated",
          }}
          width={100}
          height={100}
          src={activeImage}
        />
        {isArray(image) && (
          <div
            style={{
              cursor: "pointer",
              userSelect: "none",
              opacity: 0.8,
              fontSize: 11,
              marginTop: -13,
              padding: 0,
            }}
            onClick={() => setIndex((index + 1) % image.length)}
          >
            ⟳ view more
          </div>
        )}
      </div>
      <div
        style={{
          lineHeight: 1.2,
          fontSize: 13,
          marginLeft: 10,
          opacity: yes ? 1 : 0.7,
        }}
      >
        {children}{" "}
        {yes ? (
          <div style={{ fontSize: 16, marginTop: 3, color: "#00D221" }}>✓</div>
        ) : (
          <div style={{ fontSize: 16, marginTop: 3, color: "#EF4146" }}>✕</div>
        )}
      </div>
    </div>
  )
}

// ope_url("244")

export default () => {
  const type = {
    fontWeight: "bold",
    fontSize: 16,
  }

  const desc = {
    fontSize: 14,
    lineHeight: 1.3,
  }

  const neuron = {
    opacity: 0.8,
    marginTop: 10,
    fontSize: 14,
  }

  const margin = {
    marginTop: 10,
    lineHeight: 1.2,
    opacity: 0.8,
    marginLeft: 20,
    fontSize: 13,
  }

  const line = {
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  }

  const width = 840

  return (
    <div
      style={{
        width,
        marginLeft: width - 704,
        display: "grid",
        gridGap: 8,
        alignSelf: "center",
        justifySelf: "center",
        gridColumn: "screen",
        marginTop: 20,
        marginBottom: 20,
        gridTemplateColumns: "[bio] auto [clip] auto [prev] auto [margin] auto",
        gridTemplateRows:
          "[type] auto [desc] auto [neuron] auto [line] auto [photo] auto [line] auto [concept] auto [line] auto [text] auto",
      }}
    >
      <div style={{ gridColumn: "bio", gridRow: "type", ...type }}>
        Biological Neuron
      </div>
      <div style={{ gridColumn: "clip", gridRow: "type", ...type }}>
        CLIP Neuron
      </div>
      <div style={{ gridColumn: "prev", gridRow: "type", ...type }}>
        Previous Artificial Neuron
      </div>

      <div style={{ gridColumn: "bio", gridRow: "desc", ...desc }}>
        Probed via depth electrodes
      </div>
      <div style={{ gridColumn: "clip", gridRow: "desc", ...desc }}>
        Neuron 244 from pen­ultimate layer in CLIP RN50_4x
      </div>
      <div style={{ gridColumn: "prev", gridRow: "desc", ...desc }}>
        Neuron 483, generic person detector from Inception v1
      </div>

      <div style={{ gridColumn: "bio", gridRow: "neuron", ...neuron }}>
        Halle Berry
      </div>
      <div style={{ gridColumn: "clip", gridRow: "neuron", ...neuron }}>
        Spider-Man
      </div>
      <div style={{ gridColumn: "prev", gridRow: "neuron", ...neuron }}>
        human face
      </div>

      <div style={{ gridColumn: "bio / margin", gridRow: "line 1", ...line }} />

      <div style={{ gridColumn: "bio", gridRow: "photo" }}>
        <Cell image={HallePhoto}>
          Responds to photos of Halle Berry and Halle Berry in costume
        </Cell>
      </div>
      <div style={{ gridColumn: "clip", gridRow: "photo" }}>
        <Cell
          image={[
            SpiderManPhoto1,
            SpiderManPhoto2,
            SpiderManPhoto3,
            SpiderManPhoto4,
            SpiderManPhoto5,
          ]}
        >
          Responds to photos of Spider-Man in costume and spiders
        </Cell>
      </div>
      <div style={{ gridColumn: "prev", gridRow: "photo" }}>
        <Cell image={HumanPhoto}>Responds to faces of people</Cell>
      </div>

      <div style={{ gridColumn: "bio / margin", gridRow: "line 2", ...line }} />

      <div style={{ gridColumn: "bio", gridRow: "concept" }}>
        <Cell image={HalleDrawing}>Responds to skeches of Halle Berry</Cell>
      </div>
      <div style={{ gridColumn: "clip", gridRow: "concept" }}>
        <Cell
          image={[
            SpiderManDrawing1,
            SpiderManDrawing2,
            SpiderManDrawing3,
            SpiderManDrawing4,
            SpiderManDrawing5,
          ]}
        >
          Responds to comics or drawings of Spider-Man and spider-themed icons
        </Cell>
      </div>

      <div style={{ gridColumn: "prev", gridRow: "concept" }}>
        <Cell yes={false} image={Blank}>
          Does not respond significantly to drawings of faces
        </Cell>
      </div>

      <div style={{ gridColumn: "bio / margin", gridRow: "line 3", ...line }} />

      <div style={{ gridColumn: "bio", gridRow: "text" }}>
        <Cell image={HalleText}>Responds to the text “Halle Berry”</Cell>
      </div>
      <div style={{ gridColumn: "clip", gridRow: "text" }}>
        <Cell
          image={[
            SpiderManText1,
            SpiderManText2,
            SpiderManText3,
            SpiderManText4,
            SpiderManText5,
          ]}
        >
          Responds to the text “spider” and others
        </Cell>
      </div>
      <div style={{ gridColumn: "prev", gridRow: "text" }}>
        <Cell image={Blank} yes={false}>
          Does not respond significantly to text
        </Cell>
      </div>

      <div style={{ gridColumn: "margin", gridRow: "photo", ...margin }}>
        Photorealistic images
      </div>
      <div style={{ gridColumn: "margin", gridRow: "concept", ...margin }}>
        Conceptual drawings
      </div>
      <div style={{ gridColumn: "margin", gridRow: "text", ...margin }}>
        Images of text
      </div>
    </div>
  )
}

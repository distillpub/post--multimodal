import React from 'react'
import { Surface, ZoomedImg, Text } from '../ui'
import { range, sortBy, includes } from 'lodash'
import { max } from 'numjs'
import data from './data'
export const getFace = (emotion) =>
  `https://storage.googleapis.com/fls/nickc/multimodal/emotions_alpha3/${emotion.toLowerCase()}.png`

export const getNeuronFace = (neuron) =>
  `https://storage.googleapis.com/fls/nickc/multimodal/emotions_neurons_2point3_${neuron}.png`

const getNeuron = (neuron) => {
  // neuron top view
  const objective = 'neuron'
  const model = 'contrastive_4x'
  const layername = 'image_block_4/5/Add_6:0'
  const url_prefix =
    'https://openai-clarity.storage.googleapis.com/encyclopedia/modelzoo/2020-07-25/' +
    model +
    '/lucid.feature_vis/_feature_vis/'
  const query =
    'alpha=False&negative=False&objective=' +
    objective +
    '&op=' +
    encodeURIComponent(layername) +
    '&repeat=0&start=' +
    32 * Math.floor(neuron / 32) +
    '&steps=4096&stop=' +
    32 * (Math.floor(neuron / 32) + 1) +
    '/channel-' +
    neuron +
    '.png'
  const url = url_prefix + encodeURIComponent(query)
  return url
  return encodeURI(
    `https://openai-clarity.storage.googleapis.com/encyclopedia/modelzoo/2020-07-25/contrastive_4x/lucid.feature_vis/_feature_vis/alpha=False&negative=False&objective=neuron&op=image_block_4%2F5%2FAdd_6%3A0&repeat=1&start=1408&steps=4096&stop=1440/channel-${neuron}.png`
  )
}

const neuronNames = {
  14: 'Meditation',
  1841: 'Sleeping',
  1512: 'Happy',
  1543: 'Erotic',
  1367: '"Int"',
  2191: 'Mental health disorder',
  1430: 'Grumpy',
  2049: 'Serious',
  1193: 'Crying',
  2478: 'Shocked',
  583: 'Screaming',
  1739: 'Evil',
  1692: 'Silly / Duckface',
  91: 'Sleepy',
  1088: 'Blurry',
  451: 'Relaxing',
  1306: 'Danger / Safety',
  979: 'Destroyed',
  1587: 'Final',
  1824: 'Destroyed',
  969: '"Cry"?',
  1486: '"Hea"?',
  43: '"A"',
  52: 'Soft smile',
  1570: 'Zombie',
  111: '"Track"',
  1214: 'Wrinkled',
  962: 'Black Skin',
  2043: 'Female (?)',
  312: '"Q" (?)',
  2102: 'Adventure',
  2264: 'Yoga',
  1397: 'Nose?',
  1973: 'Laying hurt',
  2065: 'Superman',
  907: 'Charity',
  1477: 'Photo of person?',
  119: 'Sick',
  2228: '"X"',
  1141: 'Cosplay / Big group',
  425: 'Graduation',
  367: '"Wo"',
  1607: 'Mask',
  1439: 'Beautiful',
  2394: 'Makeup',
  971: 'Success + Princess',
  1030: 'Thinking + Searching',
  881: 'Big hands',
  2041: 'Blocked',
  2160: '"r"',
  2399: 'Chess?',
  1400: '"A"?',
  1169: 'Throwback',
  1535: '"In"?',
  1677: 'Workout / Sporty',
  2058: 'Selfie / Homemade',
  1077: 'Space / Universe',
  2483: 'Geometric / "exo"?',
  2129: 'Skin / Exposed / FBI',
  2297: 'Freedom / metal cage',
  1777: 'Jesus',
  1606: 'Racism / Rape / Abuse',
  1079: 'Ice',
  2284: '"ay"',
  967: 'Teardrop',
  736: 'Asian',
  1572: '"H"',
  915: '"sp"',
  1: 'One Direction (band)',
  1452: '"pr"',
  1767: '"dis"',
  2394: 'Lurking / Creep / Photobomb',
  826: 'Running',
  412: 'Enormous',
  1952: '"er"',
  525: '"ma',
  1438: 'Trojan / Spartan',
  1752: '"os"?',
  399: '"J"?',
  273: 'Court judge',
  2419: '"V"',
  1395: '"u"',
  1027: '"nu"',
  1328: '"w"',
  423: '"ri"',
  2095: 'Debate / Democracy',
  1502: '"r"',
  403: 'Person looking away',
  610: 'Laugh',
  1127: 'Forehead',
  641: 'year 2000 - 2012',
  1719: 'Punishment',
  291: 'Bindi (Indian forehead dot)',
  724: 'Confused',
  1284: '"a"',
  1670: 'Goth / Black Lipstick',
  366: '"de"',
  1688: '"b"',
  2314: 'Thumbs up',
  496: '"st"',
  2535: 'Drinking / shhing"',
  1820: 'LGBT',
  2460: 'Thankful',
  787: 'Event / Summit',
  1154: 'Blurry face',
  2083: 'Celebration',
  669: 'Muscles',
  1344: 'Star',
  2317: 'Thumbs up',
  479: 'Arabic writing',
  2003: 'Heart',
  691: 'Official letter / "Dear"',
  2271: '"Pick" / "Pink"',
  686: 'Country',
  2385: 'Cut / lurking / photobomb',
  2050: 'British',
  1213: 'Wake up / Morning',
  2361: 'Cartoon mouth',
  767: 'Champions',
  1234: 'Hug',
  1987: 'Analysis',
  297: 'Fire',
  871: 'Sunset',
  2202: 'Question Mark',
  532: 'Clock',
  673: 'Painting',
  1469: 'Braces',
  1205: 'Pink objects',
  1125: 'Brain',
  1825: 'Price tag',
  294: 'Healing',
  259: 'Kid / Teens',
  1346: 'Lightning / Miracle',
  599: 'Accept / Appoint',
  841: 'Clinic',
  2373: 'Black culture / blackowned',
  913: 'Royalty',
  1263: 'Shakespeare',
  565: 'Eye',
  652: 'Male necklace',
  1623: 'Cartoon person',
  2506: 'Burger / Sandwich',
  295: 'Exit sign',
  1176: 'Free',
  1976: 'Control',
  742: 'Woman wearing suit',
  1955: 'National flag (mostly Indian)',
  530: 'Expression',
  2203: 'Hero / Honor',
  1673: 'Doctor / Dr.',
  789: 'Montage / photobooth',
  1821: 'Shadow',
  2380: 'was / did / past-tense',
  284: 'Male photo',
  2068: 'Peace sign',
  1929: 'Astronaut / saying goodbye',
  2139: 'Playing card / credit card',
  1484: 'Desert / ground',
  829: 'Alone',
  1493: 'Zipline / bungee rope',
  265: 'Black hair',
  1674: 'Watermelon / if',
  2051: 'Tomorrow',
  2056: 'Gun',
  772: 'Trophy',
  1399: 'Wisdom / Leadership',
  1342: 'New',
  1551: 'Sentenced to Prison',
  1565: 'Public speaking',
  1640: 'Edited photo / genderswap',
  1972: 'Startrek',
  1451: 'Breakable / Glass',
  1372: 'Art',
  2340: 'Young Kid',
  1095: 'Sunglasses',
  950: 'Insult / swear / toxic',
  1728: 'Employee / Workplace',
  536: 'Sunset / golden hour  ',
  22: 'Overweight',
  418: 'Hiring',
  892: 'Naked woman',
  1122: 'Power',
  1442: 'Feminine lips',
  2481: 'Black and white',
  468: 'Praying',
  1108: 'Green Character',
  1964: 'Food / pouring',
  1849: 'Hand expression',
  1754: 'Story',
  1064: 'Fraudulent',
  730: 'Coffee',
}

const textNeurons = [
  1661,
  657,
  1375,
  630,
  2108,
  367,
  1572,
  656,
  1636,
  1853,
  1837,
  846,
  829,
  1999,
  2328,
  1435,
  631,
  1339,
  109,
  1071,
  758,
  169,
  1863,
  758,
  932,
  1324,
  911,
  301,
  1434,
  1290,
  1738,
  160,
  353,
  117,
  1232,
  400,
  402,
  43,
  111,
  312,
  366,
  399,
  423,
  496,
  525,
  915,
  969,
  1027,
  1284,
  1328,
  1367,
  1395,
  1400,
  1452,
  1486,
  1502,
  1535,
  1688,
  1752,
  1767,
  1952,
  2160,
  2228,
  2284,
  2419,
  2483,
  2535,
  1302,
  2227,
  1313,
  2453,
]

const { emotions } = data
export default ({ emotionNames }) => {
  const scaleEmotion = (neurons) => {
    const maxActivation = max(neurons.map(([val, index]) => val))
    return sortBy(
      neurons.map(([val, index]) => [val / maxActivation, index]),
      (_) => -_[0]
    )
  }

  const red = '#e63946'
  const green = '#80b918'

  // emotionNames
  return (
    <Surface width={1200} margin="auto">
      {emotionNames.map((name) => (
        <Surface marginX={10} flexFlow="row" alignItems="center" marginY={20}>
          <Surface width={150}>
            <Text
              fontWeight={600}
              wordWrap="break-word"
              marginRight={10}
              fontFamily="arial"
            >
              {name}
            </Text>
          </Surface>
          <Surface>
            <div style={{ width: 80, height: 80 }}>
              <img src={getFace(name)} style={{ borderRadius: 5 }} />
            </div>
          </Surface>
          <Text fontSize={24} opacity={0.6} marginLeft={20}>
            =
          </Text>
          <Surface flexFlow="row" alignItems="center">
            {scaleEmotion(
              emotions[name].filter(
                ([_, neuron]) => !includes(textNeurons, neuron)
              )
            )
              .slice(0, 4)
              .map(([activation, neuron], index) => (
                <React.Fragment>
                  {index > 0 && (
                    <Text fontSize={24} opacity={0.6} marginX={3}>
                      {activation > 0 ? '+' : '-'}
                    </Text>
                  )}
                  <Surface flexFlow="row" alignItems="center" marginX={20}>
                    <Surface height={100}>
                      <Surface
                        width={80}
                        height={100}
                        overflow="hidden"
                        borderRadius={5}
                        border="1px solid rgba(0, 0, 0, 0.1)"
                      >
                        <img
                          src={
                            neuronNames[neuron]
                              ? getNeuronFace(neuronNames[neuron])
                              : getNeuron(neuron)
                          }
                          width={80}
                        />
                      </Surface>
                      <Surface height={20}>
                        <Text
                          fontWeight={600}
                          fontSize={11}
                          fontFamily="Arial"
                          marginTop={3}
                          marginLeft={5}
                        >
                          <a
                            href={`https://ggoh-staging-dot-encyclopedia-251300.wl.r.appspot.com/models/contrastive_4x/image_block_4_5_Add_6_0/${neuron}`}
                            style={{ textDecoration: 'none', color: '#333' }}
                            target="_blank"
                          >
                            {(neuronNames[neuron] || neuron)
                              .toString()
                              .slice(0, 8)}
                          </a>
                        </Text>
                      </Surface>
                    </Surface>
                    <Surface
                      height={100}
                      justifyContent="flex-end"
                      marginX={5}
                      alignItems="center"
                    >
                      <Surface
                        width={30}
                        borderRadius={5}
                        background={activation > 0 ? green : red}
                        boorder="1px solid rgba(0, 0, 0, 1)"
                        opacity={0.3}
                        height={80 * Math.min(1, Math.abs(activation))}
                      />
                      <Surface height={20}>
                        <Text
                          fontWeight={600}
                          fontSize={11}
                          fontFamily="Arial"
                          marginTop={3}
                        >
                          {Math.abs(activation).toFixed(2)}
                        </Text>
                      </Surface>
                    </Surface>
                  </Surface>
                </React.Fragment>
              ))}
          </Surface>
        </Surface>
      ))}
    </Surface>
  )
}

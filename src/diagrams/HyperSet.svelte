
<script>

import * as d3 from "d3"

const classnames = ['red king crab', 'rock crab', 'hermit crab', 'conch', 'spiny lobster', 'fiddler crab', 'great white shark', 'grey whale', 'sea lion', 'starfish', 'shipwreck', 'polar bear', 'dugong', 'hippopotamus', 'platypus', 'garfish', 'jellyfish', 'chambered nautilus', 'crayfish', 'snorkel', 'killer whale', 'pelican', 'dunlin', 'albatross', 'oystercatcher', 'Dungeness crab', 'American lobster', 'lifeboat', 'breakwater', 'flamingo', 'spoonbill', 'little blue heron', 'bittern bird', 'crane bird', 'limpkin', 'common gallinule', 'black stork', 'white stork', 'hornbill', 'black swan', 'dowitcher', 'great egret', 'ptarmigan', 'triceratops', 'tiger', 'scorpion', 'tarantula', 'African rock python', 'ski', 'snowmobile']

const nonzeros = [[0, 0, 0.8546435], [0, 1, 0.3852551], [0, 2, 0.8555895], [0, 3, 0.7675982], [0, 4, 1.1657395], [0, 5, 0.35444525], [0, 6, 1.1855764], [0, 7, 0.6922554], [0, 8, 0.3919706], [0, 9, 0.9624161], [0, 10, 1.013737], [0, 11, 0.7824248], [0, 12, 1.2707796], [0, 13, 0.56085056], [0, 14, 1.2135082], [0, 15, 1.0939248], [0, 16, 1.1499813], [0, 17, 0.98686546], [0, 18, 0.7415794], [0, 19, 1.3908203], [0, 20, 0.51934606], [1, 0, 0.7705382], [1, 1, 1.2206436], [1, 2, 1.0988332], [1, 3, 1.2943641], [1, 4, 0.90433145], [1, 5, 0.6256273], [1, 6, 0.9566088], [1, 7, 1.4266349], [1, 8, 1.4470719], [1, 9, 1.1034136], [1, 10, 1.5213077], [1, 21, 1.4381951], [1, 22, 1.4761281], [1, 23, 1.5281676], [1, 24, 1.6658003], [1, 25, 0.80803025], [1, 26, 1.0977046], [1, 27, 1.1376472], [1, 28, 1.5159172], [2, 21, 2.1567688], [2, 22, 2.6181183], [2, 23, 2.7158968], [2, 24, 2.5922806], [2, 29, 1.3953965], [2, 30, 1.817668], [2, 31, 1.9013493], [2, 32, 1.7185541], [2, 33, 1.8062328], [2, 34, 1.8348125], [2, 35, 2.4572568], [2, 36, 2.2089853], [2, 37, 2.491901], [2, 38, 2.079621], [2, 39, 1.8257102], [2, 40, 2.0056858], [2, 41, 1.8804466], [2, 42, 2.452987], [2, 44, -0.1726258], [3, 11, 1.2648735], [3, 12, 1.6130416], [3, 13, 1.5399921], [3, 29, 0.58077115], [3, 30, 1.4978758], [3, 31, 1.4218328], [3, 32, 1.2425814], [3, 33, 1.3392121], [3, 34, 1.4767466], [3, 35, 0.76444787], [3, 36, 1.6013944], [3, 37, 1.4612269], [3, 38, 1.0765008], [3, 43, 1.2429032], [3, 44, 1.0758677], [4, 14, 1.3969765], [4, 21, 1.0859019], [4, 22, 1.0039837], [4, 29, 1.0900072], [4, 30, 0.74344647], [4, 31, 0.95385486], [4, 32, 0.8333461], [4, 33, 0.84297776], [4, 34, 0.70040655], [4, 35, 0.8535913], [4, 39, 1.3941795], [4, 40, 1.3415829], [4, 41, 0.83856684], [5, 0, 0.66596276], [5, 1, 0.5177058], [5, 2, 1.4152064], [5, 3, 1.3116071], [5, 15, 1.5096277], [5, 16, 1.7664281], [5, 17, 1.8547747], [5, 25, 0.8169393], [5, 43, 0.20035744], [5, 45, 1.0427067], [5, 46, 0.83871776], [5, 47, 1.0575045], [6, 0, 1.9172046], [6, 1, 2.1333683], [6, 4, 2.4179049], [6, 5, 2.5759504], [6, 18, 2.5075028], [6, 25, 1.7939543], [6, 26, 2.0642173], [6, 45, 2.32048], [7, 6, 1.1033851], [7, 7, 1.1823449], [7, 15, 0.5823907], [7, 19, 1.109139], [7, 20, 1.0289973], [7, 23, 0.62101036], [7, 27, 0.8080586], [7, 28, 0.7179952], [8, 11, 0.8070405], [8, 42, 0.5201662], [8, 48, 0.91912675], [8, 49, 0.95243126], [9, 19, 1.1732293], [9, 48, 1.655205], [9, 49, 1.437538], [10, 46, 1.02102], [10, 47, 0.4032593], [11, 24, -0.14754309]]

const neurons = [1634,1511,2352,2247,2246,1761,1276, 775,1829,909,2525,2035]

const cell_size = 20

</script>
<!-- 
<style>

</style> -->

<div style="display:flex; flex-flow:row wrap; width: 100%; margin: auto">
 	<svg style="position: relative; left: 0px; width: 1300px; font-size:12px; font-weight:400; margin:auto; height: 500px">

 		<g transform="translate(60, 80)">
			{#each d3.range(classnames.length+1) as i}
				{#if i < classnames.length}
					<g transform="translate({i*cell_size+15})">
						<text style="color:rgb(128,128,128)" transform="rotate(-41.5)">{classnames[i]}</text>
					</g>
				{/if}
				<line x1={(i)*cell_size} y1="0" x2={(i)*cell_size} y2={cell_size*neurons.length} style="stroke:rgb(180,180,180);stroke-width:1" />
				<line x1={(i)*cell_size} y1="0" x2={(i)*cell_size + 75} y2="-65" style="stroke:rgb(180,180,180);stroke-width:1" />
			{/each}

			{#each nonzeros as nz}
				<circle style="stroke-width:1px" stroke="rgb(100,100,100)" fill="rgb(255,255,255)" cx={nz[1]*cell_size+cell_size/2} cy="{nz[0]*cell_size + cell_size/2}" r ="{cell_size/2.5}"></circle>
			{/each}

			{#each d3.range(neurons.length+1) as i}
					<text text-anchor="end" style="color:rgb(128,128,128)" y={cell_size*i + 14} x="-5">{neurons[i]}</text>
					<line stroke-dasharray="4 2" y1={(i)*cell_size} x1="0" y2={(i)*cell_size} x2="{cell_size*classnames.length}" style="stroke:rgb(220,220,220);stroke-width:1" />
			{/each}

		</g>

	</svg>
</div>

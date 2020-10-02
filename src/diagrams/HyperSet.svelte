
<script>

import * as d3 from "d3"

const classnames = ['digital clock', 'hourglass', 'wall clock', 'stopwatch',
       'digital watch', 'analog clock', 'computer mouse',
       'desktop computer', 'loupe', 'combination lock',
       'solar thermal collector', 'ocarina', 'safety pin', 'mousetrap',
       'sunglass', 'paintbrush', "jack-o'-lantern", 'wing', 'spotlight',
       'remote control', 'muzzle', 'hand-held computer', 'barrette',
       'chainsaw', 'assault rifle', 'organ', 'saxophone', 'cello',
       'banjo', 'steel drum', 'pan flute', 'marimba', 'French horn',
       'accordion', 'sundial', 'odometer', 'stove', 'joystick',
       'hair dryer', 'pier', 'cannon', 'guillotine', 'maypole',
       'electric guitar', 'acoustic guitar', 'laptop computer',
       'computer keyboard', 'padlock', 'parking meter', 'gong',
       'paddle wheel', 'seat belt', 'neck brace', 'electric fan',
       'snorkel', 'slide rule', 'sunglasses', "potter's wheel",
       'spider web']

const nonzeros = [[0, 0, 0.13254546], [0, 1, 0.0764196], [0, 2, 0.04929527], [0, 3, 0.12343372], [0, 4, 0.13721293], [0, 5, 0.19419032], [0, 6, 0.15741442], [0, 7, 0.13502075], [0, 8, 0.24267381], [0, 9, 0.21576452], [0, 10, 0.061266746], [0, 11, 0.095534526], [0, 12, 0.29378286], [0, 13, 0.07489562], [0, 14, 0.09206917], [0, 15, 0.14353503], [0, 16, 0.25798845], [0, 17, 0.3028362], [0, 18, 0.20464922], [0, 19, 0.10918073], [0, 20, 0.28886023], [0, 21, 0.24318418], [0, 22, 0.2756953], [0, 23, 0.059853636], [0, 24, 0.21818696], [0, 40, -0.23076501], [1, 25, 1.8865249], [1, 26, 2.0770118], [1, 27, 1.7492636], [1, 28, 1.0690786], [1, 29, 2.015728], [1, 30, 1.9744437], [1, 31, 2.0873382], [1, 32, 2.2735896], [1, 33, 2.3021708], [2, 0, 2.3799603], [2, 1, 2.1959703], [2, 2, 2.5212748], [2, 3, 2.4113681], [2, 4, 2.5802608], [2, 5, 2.8142452], [2, 34, 2.017987], [2, 35, 1.731831], [3, 0, 1.1301476], [3, 6, 0.9765197], [3, 7, 1.1003362], [3, 8, 0.6401321], [3, 9, 1.0722121], [3, 36, 1.4509332], [3, 37, 1.1744612], [3, 38, 0.7727485], [4, 10, 0.39104986], [4, 25, 0.114697605], [4, 34, 0.27009863], [4, 39, 0.96305805], [4, 40, 0.66427845], [4, 41, 0.32382217], [4, 42, 0.6528576], [5, 26, 0.9442971], [5, 27, 1.8753471], [5, 28, 1.7058812], [5, 43, 2.169785], [5, 44, 2.3515022], [6, 1, 0.5039175], [6, 11, 0.19902527], [6, 12, 0.096430264], [6, 13, 0.51463807], [7, 6, 1.6959945], [7, 7, 1.9730021], [7, 45, 2.0577285], [7, 46, 1.5036367], [8, 39, 0.5786741], [8, 47, 0.49259287], [8, 48, 0.44427437], [9, 8, 0.38934153], [9, 11, 0.27663925], [9, 49, 0.37654817], [10, 9, 0.9468264], [10, 40, 0.46689728], [10, 50, 0.8465331], [11, 2, 1.0296175], [11, 47, 0.8672972], [12, 51, 1.2979246], [12, 52, 1.4210792], [13, 3, 0.19612193], [13, 53, 0.22059388], [14, 50, 1.221549], [14, 54, 1.109139], [15, 35, 1.2610834], [15, 55, 1.7085794], [16, 14, 3.5969512], [16, 56, 3.6431904], [17, 15, 2.3583663], [17, 57, 1.6250516], [18, 16, 2.440898], [18, 58, 1.0374908], [19, 39, -0.54164577], [19, 41, 0.8794492]]

const neurons = [2174, 1663,  532,  374, 1593, 1093, 1936, 1790,  738, 2028, 2475, 1432,  785,  364,  775, 2115, 1095, 1737,  567, 1482]

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

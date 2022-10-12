<template>
	<div class="recommend">
		<div class="slider-wrapper">
			<div class="slider-content">
				<Slider v-if="sliders.length" :sliders="sliders"></Slider>
			</div>
		</div>
	</div>
</template>

<script>
import { getRecommend } from '@/service/recommend'
import Slider from '@/components/base/slider/slider'

export default {
	name: 'recommend',

	components: {
		Slider
	},

	data() {
		return {
			sliders: [],
			albums: []
		}
	},

	async created() {
		const result = await getRecommend()

		this.sliders = result.sliders
		this.albums = result.albums
	}
}
</script>

<style lang="scss" scoped>
.recommend {
	position: fixed;
	width: 100%;
	top: 88px;
	bottom: 0;

	.slider-wrapper {
		position: relative;
        width: 100%;
        height: 0;
        padding-top: 40%;
        overflow: hidden;

		.slider-content {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
        }
	}
}
</style>

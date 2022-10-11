<template>
	<div>recommend</div>
</template>

<script>
import { getRecommend } from '@/service/recommend'

export default {
	name: 'recommend',

	data () {
		return {}
	},

	async created() {
		const result = await getRecommend()

		console.log(18, result)
	}
}
</script>

<style lang="scss" scoped>

</style>

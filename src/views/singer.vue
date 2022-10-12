<template>
	<div>singer</div>
</template>

<script>
import { getSingerList } from '@/service/singer'

export default {
	name: 'singer',

	data () {
		return {}
	},

	async created() {
		const result = await getSingerList()

		console.log(18, result)
	}
}
</script>

<style lang="scss" scoped>

</style>

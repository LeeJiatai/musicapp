import MusicList from '@/components/music-list/music-list'
import storage from 'good-storage'
import { processSongs } from '@/service/song'

export default function createDetailComponent(name, key, fetch) {
    return {
        name,

        props: {
            data: {
                type: Object,
                default: () => ({})
            }
        },

        components: {
            MusicList
        },

        data() {
            return {
                songs: [],
                loading: true
            }
        },

        computed: {
            computedData() {
                let ret = null
                const data = this.data

                if (data) {
                    ret = data
                } else {
                    const cacheData = storage.session.get(key)
                    if (cacheData && (cacheData.mid || cacheData.id + '') === this.$route.params.id) {
                        ret = cacheData
                    }
                }

                return ret
            },

            pic() {
                const computedData = this.computedData
                return computedData && computedData.pic
            },

            title() {
                const data = this.computedData
                return data && (data.name || data.title)
            }
        },

        async created() {
            const data = this.computedData
            if (!data) {
                const path = this.$route.matched[0].path
                this.$router.push({
                    path
                })
                return
            }
            const result = await fetch(data)
            const songs = await processSongs(result.songs)
            this.songs = songs
            this.loading = false
        }
    }
}

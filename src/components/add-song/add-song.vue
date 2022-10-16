<template>
    <teleport to='body'>
        <transition name="slide">
            <div class="add-song" v-show="visible">
                <div class="header">
                    <h1 class="title">添加歌曲到列表</h1>
                    <div class="close" @click="hide">
                        <i class="icon-close"></i>
                    </div>
                </div>

                <div class="search-input-wrapper">
                    <searchInput
                        v-model="query"
                        placeholder="搜索歌曲"
                    ></searchInput>
                </div>

                <div v-show="!query">
                    <Switches
                        :items="['最近播放', '搜索历史']"
                        v-model="currentIndex"
                    ></Switches>

                    <div class="list-wrapper">
                        <Scroll
                            ref="scrollRef"
                            class="list-scroll"
                            v-if="currentIndex === 0"
                        >
                            <div class="list-inner">
                                <SongList
                                    :songs="playHistory"
                                    @select="selectSongBySongList"
                                ></SongList>
                            </div>
                        </Scroll>

                        <Scroll
                            ref="scrollRef"
                            class="list-scroll"
                            v-if="currentIndex === 1"
                        >
                            <div class="list-inner">
                                <SearchList
                                    :searches="searchHistory"
                                    :showDelete="false"
                                    @select="addQuery"
                                ></SearchList>
                            </div>
                        </Scroll>
                    </div>
                </div>

                <div class="search-result" v-show="query">
                    <suggest
                        :query="query"
                        :show-singer="false"
                        @select-song="selectSongSuggest"
                    >
                    </suggest>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
import Scroll from '@/components/base/scroll/scroll'
import searchInput from '@/components/search/search-input'
import Suggest from '@/components/search/suggest'
import Switches from '@/components/base/switches/switches'
import SongList from '@/components/base/song-list/song-list'
import SearchList from '@/components/base/search-list/search-list'
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import useSearchHistory from '@/components/search/use-search-history'

export default {
    name: 'add-song',

    components: {
        Scroll,
        searchInput,
        Suggest,
        Switches,
        SongList,
        SearchList
    },

    setup() {
        const visible = ref(false)
        const query = ref('')
        const currentIndex = ref(0)
        const scrollRef = ref(null)

        const store = useStore()
        const searchHistory = computed(() => store.state.searchHistory)
        const playHistory = computed(() => store.state.playHistory)

        const { saveSearch } = useSearchHistory()

        watch(query, async () => {
            await nextTick()
            refreshScroll()
        })

        async function show() {
            visible.value = true
            await nextTick()
            refreshScroll()
        }

        function hide() {
            visible.value = false
        }

        function addQuery(s) {
            query.value = s
        }

        function selectSongBySongList({ song }) {
            addSong(song)
        }

        function selectSongSuggest(song) {
            addSong(song)
            saveSearch(query.value)
        }

        function addSong(song) {
            store.dispatch('addSong', song)
        }

        function refreshScroll() {
            scrollRef.value.scroll.refresh()
        }

        return {
            scrollRef,
            visible,
            query,
            currentIndex,
            searchHistory,
            playHistory,
            show,
            hide,
            addQuery,
            selectSongBySongList,
            selectSongSuggest
        }
    }
}
</script>

<style lang="scss" scoped>
.add-song {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 300;
    background: $color-background;

    .header {
        position: relative;
        height: 44px;
        text-align: center;
        .title {
            line-height: 44px;
            font-size: $font-size-large;
            color: $color-text;
        }
        .close {
            position: absolute;
            top: 0;
            right: 8px;
            .icon-close {
                display: block;
                padding: 12px;
                font-size: 20px;
                color: $color-theme;
            }
        }
    }

    .search-input-wrapper {
        margin: 20px
    }

    .list-wrapper {
        position: absolute;
        top: 165px;
        bottom: 0;
        width: 100%;
        .list-scroll {
            height: 100%;
            overflow: hidden;
            .list-inner {
                padding: 20px 30px;
            }
        }
    }

    .search-result {
        position: fixed;
        top: 124px;
        bottom: 0;
        width: 100%;
    }
}
</style>

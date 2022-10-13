import { PLAY_MODE } from '@/assets/js/constant'
import { shuffe } from '@/assets/js/util'

export function selectPlay({ commit }, { list, index }) {
    console.log(5, PLAY_MODE.sequence)
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', list)
    commit('setCurrentIndex', index)
}

export function randomPlay({ commit }, list) {
    commit('setPlayMode', PLAY_MODE.random)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', shuffe(list))
    commit('setCurrentIndex', 0)
}

export function changeMode({ commit, state, getters }, mode) {
    const currentId = getters.currentSong.id
    if (mode === PLAY_MODE.random) {
        commit('setPlayList', shuffe(state.sequenceList))
    } else {
        commit('setPlayList', shuffe(state.sequenceList))
    }

    const index = state.playList.findIndex(song => {
        return song.id === currentId
    })
    commit('setCurrentIndex', index)
    commit('setPlayMode', mode)
}

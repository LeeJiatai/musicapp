import { PLAY_MODE } from '@/assets/js/constant'
import { shuffe } from '@/assets/js/util'

export function selectPlay({ commit }, { list, index }) {
    commit('setPlayMode', PLAY_MODE.squence)
    commit('setSquenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', list)
    commit('setCurrentIndex', index)
}

export function randomPlay({ commit }, list) {
    commit('setPlayMode', PLAY_MODE.random)
    commit('setSquenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', shuffe(list))
    commit('setCurrentIndex', 0)
}

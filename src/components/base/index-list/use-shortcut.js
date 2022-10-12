import { computed } from 'vue'

export default function useShortcuts(props) {
    const shortcutList = computed(() => {
        return props.data.map((group) => group.title)
    })

    return {
        shortcutList
    }
}

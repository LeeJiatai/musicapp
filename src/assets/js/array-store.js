import storage from 'good-storage'

function inertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)

    if (index === 0) {
        return
    }

    if (index > 0) {
        arr.splice(index, 1)
    }

    arr.unshift(val)

    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

function deketeFromArr(arr, compare) {
    const index = arr.findIndex(compare)

    if (index > -1) {
        arr.splice(index, 1)
    }
}

export function save(item, key, compare, maxLen) {
    const items = storage.get(key, [])
    inertArray(items, item, compare, maxLen)
    storage.set(key, items)
    return items
}

export function remove(key, compare) {
    const items = storage.get(key, [])
    deketeFromArr(items, compare)
    storage.set(key, items)
    return items
}

export function load(key) {
    return storage.get(key, [])
}

export function clear(key) {
    storage.remove(key)
    return []
}

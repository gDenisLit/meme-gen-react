export const storageService = {
    query,
    get,
    post,
    postMany,
    put,
    remove,
}

type Key = string
type Entity = any

function query(key: Key) {
    const data = localStorage.getItem(key)
    var entities = JSON.parse(data ?? "[]")
    return Promise.resolve(entities)
}

function get(key: Key, entityId: string) {
    return query(key)
        .then(entities => entities.find((entity: Entity) => entity._id === entityId))
}

function post(key: Key, newEntity: Entity) {
    newEntity._id = _makeId()
    return query(key)
        .then(entities => {
            entities.push(newEntity)
            _save(key, entities)
            return newEntity
        })
}

function postMany(key: Key, newEntities: Entity[]) {
    return query(key)
        .then(entities => {
            newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
            entities.push(...newEntities)
            _save(key, entities)
            return entities
        })
}

function put(key: Key, updatedEntity: Entity) {
    return query(key)
        .then(entities => {
            const idx = entities.findIndex((entity: Entity) => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(key, entities)
            return updatedEntity
        })
}

function remove(key: Key, entityId: string) {
    return query(key)
        .then(entities => {
            const idx = entities.findIndex((entity: Entity) => entity._id === entityId)
            entities.splice(idx, 1)
            _save(key, entities)
        })
}

function _save(key: Key, entities: Entity[]) {
    localStorage.setItem(key, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
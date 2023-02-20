export const SHOW_MSG = 'show-msg'

type ListenerMap = {
    [listener: string]: Function[]
}

function createEventEmitter() {
    const listenersMap: ListenerMap = {}
    return {
        on(evName: string, listener: Function): Function {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName: string, data: any) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBus = createEventEmitter()

export function showUserMsg(msg: object) {
    eventBus.emit('show-msg', msg)
}

export function showSuccessMsg(txt: string) {
    showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt: string) {
    showUserMsg({ txt, type: 'error' })
}
import { eventBus } from "@/services/event-bus.service"

type EventBusHook = [
    (evName: string, cb: Function) => void,
    () => void
]

export const useEventBus = (): EventBusHook => {

    const subscriptions: Function[] = []

    function subscribe(evName: string, cb: Function) {
        subscriptions.push(
            eventBus.on(evName, cb)
        )
    }

    function unsubscribe() {
        subscriptions.forEach(ev => { ev() })
    }

    return [subscribe, unsubscribe]
}
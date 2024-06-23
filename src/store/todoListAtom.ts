import {atom} from "jotai";

export type TodoItem = {
    content: string,
    isDone: boolean
}
// export const todoListAtom = atom<Array<TodoItem>>([{content: 'adasd', isDone: false}, {
//     content: 'vosnadovnodv',
//     isDone: false
// }, {content: 'xclvkmniori0woe', isDone: false}])
export const todoListAtom = atom<Array<TodoItem>>([])

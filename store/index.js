import { Slider } from "ant-design-vue"

export const state = () => ({
    pickTodoData: null,
    todoDataList: [
        {
            categoryName: 'All',
            isPick: true,
            color: null,
            idx: 0,
        }
    ],
    isTodoModal: false,
    isZoomTodoModal: false,
})

export const mutations = {
    isPickTodoData(state, payload){
        state.pickTodoData = payload
    },
    setIsZoomTodoModal(state, payload){
        state.isZoomTodoModal = payload
    },
    setTodoDataList(state, payload){
        if(payload.type === 'add'){
            state.todoDataList = payload.value
        }else if(payload.type === 'push'){
            payload.value.idx = state.todoDataList.length
            let idx = state.todoDataList.findIndex(v => v.isPick)
            state.todoDataList.push(payload.value)
            state.todoDataList[idx].isPick = false
        }else if(payload.type === 'mod'){
            state.todoDataList.splice(payload.idx, 1 , payload.value)
        }else if(payload.type === 'del'){
            state.todoDataList.splice(payload.idx, 1)
        }else if(payload.type === 'categoryPick'){
            state.todoDataList[state.todoDataList.findIndex(v => v.isPick === true)].isPick = false
            state.todoDataList[payload.idx].isPick = true
        }else if(payload.type === 'pushTodoList'){
            state.todoDataList[payload.idx].todoList.push(payload.value)
        }else if(payload.type === 'isTab'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isTab = !state.todoDataList[payload.idx].todoList[payload.childIdx].isTab
        }else if(payload.type === 'pushTodoBody'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isTab = !state.todoDataList[payload.idx].todoList[payload.childIdx].isTab
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData.push(payload.value)
        }else if(payload.type === 'changeInputText'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].inputText = payload.value
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].bodyText = payload.value.replace(/\n/g , '<br/>')
        }else if(payload.type === 'isInput'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isInput = !state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isInput
        }else if(payload.type === 'delBody'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData.splice(payload.bodyIdx , 1)
        }else if(payload.type === 'modMap'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].roadAddress = payload.value
        }else if(payload.type === 'modImg'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].url = payload.value
        }else if(payload.type === 'modMonth'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].date = payload.value
        }else if(payload.type === 'isCalendar'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isCalendar = !state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isCalendar
        }else if(payload.type === 'delTodo'){
            state.todoDataList[payload.idx].todoList.splice(payload.childIdx , 1)
        }else if(payload.type === 'isClose'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isClose = !state.todoDataList[payload.idx].todoList[payload.childIdx].isClose
        }
    },
    setIsTodoModal(state , payload){
        state.isTodoModal = payload
    }
}

export const actions = {
}
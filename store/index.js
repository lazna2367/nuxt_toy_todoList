import { Slider } from "ant-design-vue"

export const state = () => ({
    fullPath : '',
    sideNavData: [],
})

export const mutations = {
    setFullPath(state, payload){
        state.fullPath = payload
    },
    setSideNavData(state, payload){
        state.sideNavData = payload
    },
    pushSideNavData(state, payload){
        state.sideNavData.push(payload)
    },
    // spliceSideNavData(state, payload){        
    //     state.sideNavData.splice(payload.idx)
    // }
    
}

export const actions = {

}
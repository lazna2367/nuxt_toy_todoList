<template>
    <div class="zoom-modal-template">
        <div class="modal-template">
            <div class="zoom-todo-top">
                <div class="close-icon" @click="setIsZoomTodoModal(false)">
                    <a-icon type="close" />
                </div>
            </div>
            <div class="zoom-todo-body">
                
            </div>
        </div>
    </div>
</template>
<script>
import { mapState , mapMutations , mapActions } from 'vuex';
export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapState(['isZoomTodoModal']),
    },
    methods:{
        ...mapMutations(['setIsZoomTodoModal']),
    },
}
</script>
<style lang="scss">
    .zoom-modal-template{
        background: #0000004d;
        width: 100%;
        height: 100%;
        z-index: 10;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        >.modal-template{
            width: 600px;
            height: 600px;
            background: white;
            display: grid;
            grid-template-rows: 15% 85%;
            >.zoom-todo-top{
                width: 100%;
                position: relative;
                >.close-icon{
                    cursor: pointer;
                    position: absolute;
                    right: -80px;
                    top: 16px;
                    width: 60px;
                    height: 60px;
                    font-size: 50px;
                    background: white;
                    border: 5px solid #595959fc;
                    color: #595959fc;;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                }
            }
            >.zoom-todo-body{
                width: 100%;
            }
        }
    }
</style>
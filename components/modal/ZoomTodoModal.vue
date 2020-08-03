<template>
    <div class="zoom-modal-template">
        <div class="modal-template" :class="pickTodoData.color">
            <div class="zoom-todo-top">
                <div class="close-icon" @click="setIsZoomTodoModal(false)">
                    <a-icon type="close" />
                </div>
            </div>
            <div class="zoom-todo-body">
                {{pickTodoData}}
            </div>
        </div>
    </div>
</template>
<script>
import { mapState , mapMutations , mapActions } from 'vuex';
export default {
    props:['categoryData'],
    data(){
        return{
            
        }
    },
    computed:{
        ...mapState(['isZoomTodoModal','todoDataList','pickTodoData']),
        isTodoList(){
            return this.todoDataList.find(v => {return v.isPick === true})
        },
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
                background: #abb9ff;
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
                background: #d1dbff;
            }
        }
        >.modal-template.yellow{
            border: 2px solid #ffbf54;
            >.zoom-todo-top{
                background: #ffed89;
            }
            >.zoom-todo-body{
                background: #fff7d1;
            }
        }
        >.modal-template.red{
            border: 2px solid #ff5954;
            >.zoom-todo-top{
                background: #ffb7ab;
            }
            >.zoom-todo-body{
                background: #ffded1;
            }
        }
        >.modal-template.blue{
            border: 2px solid #548cff;
            >.zoom-todo-top{
                background: #abb9ff;
            }
            >.zoom-todo-body{
                background: #d1dbff;
            }
        }
        >.modal-template.green{
            border: 2px solid #3bc73c;
            >.zoom-todo-top{
                background: #8aff99;
            }
            >.zoom-todo-body{
                background: #d2ffd1;
            }
        }
        >.modal-template.purple{
            border: 2px solid #ba54ff;
            >.zoom-todo-top{
                background: #dbabff;
            }
            >.zoom-todo-body{
                background: #e9d1ff;
            }
        }
    }
</style>
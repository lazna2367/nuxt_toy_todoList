<template>
    <div class="template">
        <div class="card-modal-template">
            <div class="flex-template-body">
                <div class="left-top-layout">
                    <div class="img-box">

                    </div>
                </div>    
                <div class="right-top-layout">
                    <div class="top-tab-area">
                        <a-icon class="round-close-btn" type="close-circle" @click="close()"/>
                    </div>
                    <div class="middle-area">
                        
                    </div>
                    <!-- <a-icon type="close" @click="close()"/> -->
                </div>
                <div class="left-bot-layout">
                    <div>
                        <div class="search-modal-btn">

                        </div>
                        <div class="img-upload-btn">

                        </div>
                        <div class="form-btn">

                        </div>
                    </div>
                </div>
                <div class="right-bot-layout">
                    <div class="bot-area">
                        
                    </div>
                </div>                
            </div>
            
        </div>
    </div>      
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted(){
        
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }   
}
</script>
<style lang="scss">
.template{
    
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: fixed;    
    // transition: opacity 0.3s ease;
    z-index: 10;
    >.card-modal-template{
        position: relative;
        background: white;
        width: 80%;
        height: 80%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 29px;
        >.flex-template-body{       
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            border-radius: 29px;
            padding: 32px;
            padding-top: 16px;
            height: 100%;
            >div{
                height: 10px;
                border: 1px solid gray;
                padding: 16px;
            }
            >.left-top-layout{
                display: flex;
                justify-content: center;
                flex-basis: 40%;
                flex-grow: 1;
                height: 70%;
                padding-bottom: 0;
                >.img-box{
                    border: 1px solid gray;
                    width: 80%;
                    height: 100%;
                }
            }.right-top-layout{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                flex-basis: 60%;
                flex-grow: 1;
                height: 70%;
                >.top-tab-area{
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    width: 100%;
                    height: 15%;
                    border: 1px solid gray;
                    >.round-close-btn{

                        font-size: 30px;
                        margin-left: auto;
                    }  
                }      
                >.middle-area{
                    border: 1px solid gray;
                    width: 100%;
                    height: 80%;
                }
            }
            >.left-bot-layout{
                display: flex;
                justify-content: center;
                flex-basis: 40%;
                height: 30%;
                >div{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    border: 1px solid gray;
                    width: 80%;
                    height: 100%;
                    >.search-modal-btn{
                        border: 1px solid gray;
                        width: 100%;
                        height: 20%;
                    }
                    >.img-upload-btn{
                        width: 100%;
                        border: 1px solid gray;
                        height: 20%;
                    }
                    >.form-btn{
                        border: 1px solid gray;
                        width: 100%;
                        height: 40%;
                    }
                }
            }
            >.right-bot-layout{
                flex-basis: 60%;
                height: 30%;
                >.bot-area{
                    width: 100%;
                    height: 100%;
                    border: 1px solid gray;
                }
            }
        }
    }
}

</style>
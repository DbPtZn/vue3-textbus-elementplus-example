<template>
    <div class="header-picture">
        <img 
            :src="src?src:defaultIMG" 
            alt="图片加载中..."
            :style="{'object-position':'center'+ ' ' + (offset + '%'),cursor: cursorModel}"
            v-if="renderStatus"
            draggable = "false"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @mouseout="onMouseOut"
        >
        <div class="btn-group" v-if="renderStatus">
            <div v-if="!adjustModel">
                <button class="btn btn-status" @click="change">修改</button>
                <button class="btn btn-status" @click="adjustOn">调整</button>
                <button class="btn btn-status" @click="hide">移除</button>
            </div>
            <!-- 调整模式状态下的按钮 -->
            <div v-if="adjustModel">
                <button class="btn btn-status" @click="save();adjustOff()">保存</button>
                <button class="btn btn-status" @click="cancel();adjustOff()">取消</button>
            </div>
        </div>
        <!-- 移除题头图状态下显示的UI -->
        <div class="create-header-picture" v-if="!renderStatus" @click="show">
            <span>插入题头图</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
export default defineComponent({

props: {
    /** 图片地址 */
    src: String,
    /** 偏移值 0~100 */
    offset: Number,
    /** 渲染状态 */
    renderStatus: Boolean
},
setup(props,{emit}){
    let offset:Ref<number> = ref(props.offset ? props.offset : 50)
    let renderStatus:Ref<boolean> = ref(props.renderStatus)
    /** 设置默认图片 */
    const defaultIMG:Ref<string> = ref('https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')


    /** 动作 */
    let adjustModel:Ref<boolean> = ref(false)   //调整模式的开关
    let cursorModel:Ref<string> = ref('default')
    let preOffset:number = offset.value

    const methods = {
        change:() => {
            emit('changePicture')
        },
        adjustOn:() => {
            adjustModel.value = true
            cursorModel.value = "move"
        },
        adjustOff:() => {
            adjustModel.value = false
            cursorModel.value = "default"
        },
        hide:() => {
            renderStatus.value = false
        },
        show:() => {
            renderStatus.value = true
        },
        save:() => {
            // console.log(offset.value)
            emit('offset-modify',offset.value)
        },
        cancel:() => {
            offset.value = preOffset
        },
    }



    /** 图片的行为 */
    let adjustState:boolean = false
    let clientY: number
    const imgActions = {
        onMouseDown:(ev:any)=> {
            if(!adjustModel.value) return
            adjustState = true
            clientY = ev.clientY
            ev.preventDefault();    //取消事件，这样两个鼠标事件不会同时触发
        },
        onMouseUp:()=> {
            adjustState = false
        },
        onMouseMove:(ev:any) => {
            if(!adjustState) return
            if(clientY - ev.clientY > 0){
                if(offset.value <= 0) { offset.value = 0; return }
                offset.value -= 1
            }else if(clientY - ev.clientY < 0){
                if(offset.value >= 100) { offset.value = 100; return }
                offset.value += 1
            }
            clientY = ev.clientY
        },
        onMouseOut:() => {
            adjustState = false
        }
    }

    return {
        offset,
        renderStatus,
        defaultIMG,
        adjustModel,
        cursorModel,
        ...imgActions,
        ...methods
    }
}
})

</script>

<style lang="less" scoped>
.header-picture {
    width: 100%;
    position: relative;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    &:hover {
        .btn-status{
            display: inline;
        }
    }
}

img {
    inset: 0;
    pointer-events: auto;
    object-position: center;
    object-fit: cover;
    width: 100%;
    height: 300px;  //题头图高度
}

.btn-group {
    position: absolute;
    right: 100px;
    bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
        font-size: 14px;
        line-height: 20px;
        margin-right: 1px;
        border:none;
        color:#ffff;
        background-color: rgba(0, 0, 0, 0.26);

        &:hover {
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.40);
        }
    }
    .btn-status {
        display: none;
    }
}

.create-header-picture {
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    span {
        display: none;
        color: rgba(0, 0, 0, 0.226);
        &:hover {
            cursor: pointer;
            color: rgba(0, 0, 0, 0.712);
        }
    }

    &:hover {
        span {
            display: block;
        }
        border-bottom: 1px solid rgba(0, 0, 0, 0.082);
    }
}
</style>
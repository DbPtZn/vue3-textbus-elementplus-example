<template>
  <div>
      <router-view />
  </div>
</template>

<style lang="less">
html{
  overflow-x: hidden;
}
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
}
#app{
  width: 100%;
  height: 100%;
}




/** 定制滚动条 */
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
	width: 6px;
	height: 16px;
	background-color: #ffffff;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	// -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #ffffff;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #DCDFE6;
}
</style>

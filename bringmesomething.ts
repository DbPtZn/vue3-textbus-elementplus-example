

// interface good {
//     name:string
//     amount:number
// }
// class Shop {
//     extantGoods:good[]

//     constructor(extantGoods:good[]) {
//         this.extantGoods = extantGoods
//     }

//     stockWithGoods(){}
//     query(goodname:string) { //商品查询
//         const good = this.extantGoods.find(item => item.name == goodname)
//         if(good && good.amount > 0) return good.amount
//         return false
//     }
//     sell(goodname:string,amount:number){
//         const good = this.extantGoods.find(item => item.name == goodname)
//         if(good && good.amount > amount) {
//             good.amount = good.amount - amount
//         }else {
//             console.log("商品数量不足，出售失败")
//         }
//     }
// }
// const goods:good[] = [
//     {name:"冰淇淋",amount:100},
//     {name:"饮料",amount:100},
//     {name:"其它",amount:10000},
// ]
// const sevenEleven = new Shop(goods)
// const BringMeSomething = [
//     {name:"冰淇淋",amount:2},
//     {name:"饮料",amount:1}
// ]

// BringMeSomething.forEach(item => {
//     if(sevenEleven.query(item.name)){
//         sevenEleven.sell(item.name,item.amount)
//     }else{
//         console.log("查无目标商品")
//     }
// })

// interface goods {
//     amount:number
// }
function bringMeIceCream(drink) {
    const iceCream = 2
    if(drink > 0) {
        drink = 1
        return {
            iceCream,
            drink
        }
    }else {
        return iceCream
    }
}



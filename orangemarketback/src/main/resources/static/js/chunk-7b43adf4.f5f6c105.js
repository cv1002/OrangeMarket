(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b43adf4"],{1120:function(t,e,n){},8558:function(t,e,n){"use strict";n("1120")},"906c":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("VanTabs",{attrs:{"offset-top":"46px",sticky:""},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[n("VanTab",{attrs:{title:"全部订单"}},[n("VanList",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(e,o){return n("ARow",{key:o},[n("OrderCard",{attrs:{order:e,place:"ShopManage",value:e.countCommodity},on:{postgood:function(e){return t.postGoods(o)}}})],1)})),1)],1),n("VanTab",{attrs:{title:"待发货订单"}},[n("VanList",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(e,o){return n("ARow",{key:o},["待发货"===e.itemName?n("OrderCard",{attrs:{order:e,place:"ShopManage",value:e.countCommodity},on:{postgood:function(e){return t.postGoods(o)}}}):t._e()],1)})),1)],1),n("VanTab",{attrs:{title:"上架商品管理"}},[n("VanList",{attrs:{finished:t.goodfinished,"finished-text":"没有更多了"},on:{load:t.onLoadGood},model:{value:t.goodloading,callback:function(e){t.goodloading=e},expression:"goodloading"}},[t._l(t.goodList,(function(e,o){return n("ARow",{key:o},[e.commodityStatus?n("VanCard",{staticStyle:{"font-size":"15px",background:"white",border:"1px solid #ebedf0"},attrs:{thumb:e.mainIcon,title:e.commodityName},scopedSlots:t._u([{key:"tags",fn:function(){return[n("van-tag",{attrs:{plain:"",type:"danger"}},[t._v("好评数："+t._s(e.praiseCommentCount))]),n("van-tag",{attrs:{plain:"",type:"primary"}},[t._v("评论数："+t._s(e.commentCount))])]},proxy:!0},{key:"footer",fn:function(){return[n("VanButton",{on:{click:function(e){return t.putOffShelf(o)}}},[t._v("下架")]),n("VanButton",{on:{click:function(e){return t.getSub(o)}}},[t._v("修改库存")])]},proxy:!0}],null,!0)}):t._e()],1)})),n("VanButton",{staticStyle:{position:"fixed",bottom:"20px","margin-left":"80%"},attrs:{icon:"plus",round:"",type:"primary"},on:{click:t.toBuild}})],2)],1),n("VanTab",{attrs:{title:"下架商品"}},[n("VanList",{attrs:{finished:t.goodfinished,"finished-text":"没有更多了"},on:{load:t.onLoadGood},model:{value:t.goodloading,callback:function(e){t.goodloading=e},expression:"goodloading"}},[t._l(t.goodList,(function(e,o){return n("ARow",{key:o},[e.commodityStatus?t._e():n("VanCard",{staticStyle:{"font-size":"15px",background:"white",border:"1px solid #ebedf0"},attrs:{thumb:e.mainIcon,title:e.commodityName},scopedSlots:t._u([{key:"tags",fn:function(){return[n("van-tag",{attrs:{plain:"",type:"danger"}},[t._v("好评数："+t._s(e.praiseCommentCount))]),n("van-tag",{attrs:{plain:"",type:"primary"}},[t._v("评论数："+t._s(e.commentCount))])]},proxy:!0},{key:"footer",fn:function(){return[n("VanButton",{on:{click:function(e){return t.putOnShelf(o)}}},[t._v("上架")])]},proxy:!0}],null,!0)})],1)})),n("VanButton",{staticStyle:{position:"fixed",bottom:"20px","margin-left":"80%"},attrs:{icon:"plus",round:"",type:"primary"},on:{click:t.toBuild}})],2)],1),n("VanPopup",{staticStyle:{height:"70%"},attrs:{closeable:"",position:"bottom"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("div",{staticStyle:{margin:"10px",padding:"10px","font-weight":"bold"}},[t._v(" 修改库存 ")]),n("inputStock",{attrs:{subList:this.subCommodity}})],1)],1)},a=[],r=n("1da1"),i=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("e447")),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._l(t.subList,(function(e,o){return n("van-cell",{key:o,attrs:{"is-link":""},on:{click:function(e){return t.showPopup(o)}}},[t._v(" "+t._s(e.subName)+" 库存："+t._s(e.stock)+" ")])})),n("van-popup",{attrs:{position:"bottom"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("van-field",{attrs:{label:"填写你的库存",type:"digit"},scopedSlots:t._u([{key:"button",fn:function(){return[n("van-button",{attrs:{size:"small",type:"primary"},on:{click:t.postStock}},[t._v("确认提交")])]},proxy:!0}]),model:{value:t.stock,callback:function(e){t.stock=e},expression:"stock"}})],1)],2)},c=[],d=(n("a9e3"),n("d399")),u={props:{subList:Array},name:"inputStock",data:function(){return{stock:0,show:!1,subId:Number,index:Number}},methods:{showPopup:function(t){this.show=!0,this.subId=this.subList[t].subId,this.index=t},postStock:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var o,a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.e("chunk-4a8a29de").then(n.bind(null,"31ca"));case 2:return o=e.sent,a=o.$,r=new FormData,r.append("stock",t.stock),r.append("subId",t.subId),e.next=9,a.put("/commodity/updateStock",r);case 9:i=e.sent,i.data.success?(Object(d["a"])("修改库存成功"),t.subList[t.index].stock=t.stock,t.show=!1):Object(d["a"])("修改失败");case 11:case"end":return e.stop()}}),e)})))()}}},l=u,p=n("2877"),f=Object(p["a"])(l,s,c,!1,null,"127ea9c2",null),m=f.exports,h={components:{OrderCard:i["a"],inputStock:m},name:"ShopManage",methods:{onLoad:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var o,a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.e("chunk-4a8a29de").then(n.bind(null,"31ca"));case 2:return o=e.sent,a=o.$,t.page++,e.next=7,a.get("/shopOrder?page=".concat(t.page,"&pageSize=",10));case 7:if(r=e.sent,t.loading=!1,10*t.page>=r.data.information.total&&(t.finished=!0),0!==r.data.information.records.length)for(i=0;i<r.data.information.records.length;i++)t.list.push(r.data.information.records[i]);case 11:case"end":return e.stop()}}),e)})))()},onLoadGood:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var o,a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.e("chunk-4a8a29de").then(n.bind(null,"31ca"));case 2:return o=e.sent,a=o.$,t.goodpage++,e.next=7,a.get("/shop?page=".concat(t.goodpage,"&pageSize=",10));case 7:if(r=e.sent,t.goodloading=!1,10*t.page>=r.data.information.total&&(t.goodfinished=!0),0!==r.data.information.records.length)for(i=0;i<r.data.information.records.length;i++)t.goodList.push(r.data.information.records[i]);case 11:case"end":return e.stop()}}),e)})))()},postGoods:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function o(){var a,r,i,s;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,n.e("chunk-4a8a29de").then(n.bind(null,"31ca"));case 2:return a=o.sent,r=a.$,i=new FormData,i.append("orderId",e.list[t].orderId),i.append("recordId",3),o.next=9,r.put("/orderStateflow",i);case 9:if(s=o.sent,!s.data.success){o.next=16;break}return Object(d["a"])("发货成功！"),o.next=14,e.reload();case 14:o.next=17;break;case 16:Object(d["a"])("确认收货失败");case 17:case"end":return o.stop()}}),o)})))()},putOffShelf:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function o(){var a,r,i,s;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,n.e("chunk-4a8a29de").then(n.bind(null,"31ca"));case 2:return a=o.sent,r=a.$,i=new FormData,i.append("cid",e.goodList[t].cid),i.append("commodityStatus",!1),o.next=9,r.put("/commodity/updateStatus",i);case 9:s=o.sent,s.data.success?(Object(d["a"])("下架成功"),e.reload()):Object(d["a"])("下架失败");case 11:case"end":return o.stop()}}),o)})))()},putOnShelf:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function o(){var a,r,i,s;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,n.e("chunk-4a8a29de").then(n.bind(null,"31ca"));case 2:return a=o.sent,r=a.$,i=new FormData,i.append("cid",e.goodList[t].cid),i.append("commodityStatus",!0),o.next=9,r.put("/commodity/updateStatus",i);case 9:s=o.sent,s.data.success?(Object(d["a"])("上架成功"),e.reload()):Object(d["a"])("上架失败");case 11:case"end":return o.stop()}}),o)})))()},toBuild:function(){this.$router.push({name:"新建商品"})},reload:function(){this.list=[],this.goodList=[],this.loading=!1,this.finished=!1,this.page=0,this.goodpage=0,this.onLoad(),this.onLoadGood()},getSub:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function o(){var a,r,i;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,n.e("chunk-4a8a29de").then(n.bind(null,"31ca"));case 2:return a=o.sent,r=a.$,o.next=6,r.get("/commodity?commodityId=".concat(e.goodList[t].cid));case 6:i=o.sent,e.subCommodity=i.data.information.subCommodity,e.show=!0;case 9:case"end":return o.stop()}}),o)})))()}},data:function(){return{show:!1,active:0,list:[],loading:!1,finished:!1,page:0,goodList:[],goodpage:0,goodloading:!1,goodfinished:!1,subCommodity:[]}}},g=h,b=Object(p["a"])(g,o,a,!1,null,"7f650804",null);e["default"]=b.exports},e447:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card"},["SetOrder"===t.place?n("van-cell",{style:{"font-weight":"bold","font-size":"120%","border-radius":"25px"}},[n("van-icon",{attrs:{name:"shop-o"}}),t._v(" "+t._s(t.order.shopName)+" ")],1):"ShopManage"===t.place?n("div",{staticStyle:{margin:"10px","padding-top":"10px","padding-left":"10px","font-weight":"bold","font-size":"large"}},[t._v(" 订单号："+t._s(t.order.orderId)+" ")]):n("van-cell",{style:{"font-weight":"bold","font-size":"120%","border-radius":"25px"}},[n("van-icon",{attrs:{name:"shop-o"}}),t._v(" "+t._s(t.order.shopName)+" ")],1),"OrderManage"===t.place||"ShopManage"===t.place?n("ARow",{staticStyle:{color:"red","font-weight":"bold","margin-left":"20px"},attrs:{span:"12"}},[t._v(" 订单"+t._s(t.order.itemName)+" ")]):t._e(),n("ARow",{attrs:{justify:"end",type:"flex"}},[n("ACol",{attrs:{span:"10"}},[n("div",[n("img",{staticClass:"goodsPicture",attrs:{src:t.order.subIcon}})])]),n("ACol",{attrs:{span:"1"}}),n("ACol",{attrs:{span:"12"}},[n("div",{style:{"font-weight":"bold","font-size":"3vw",color:"black"}},[n("span",[t._v(" "+t._s(t.order.commodityName)+" ")]),n("br"),n("span",{style:{"font-size":"2vw",color:"grey"}},[t._v(" "+t._s(t.order.subName)+" ")])])]),n("ACol",{style:{"font-size":"2vw",color:"grey"}},[t._v(" ￥ "+t._s(t.order.price)+" *"+t._s(t.value)+" ")])],1),n("ARow",{attrs:{justify:"end",type:"flex"}},[n("ACol",{style:{"font-weight":"bold","font-size":"3vw",color:"grey"}},[t._v(" 总价：￥ "+t._s(Math.round(t.order.price*t.value*100)/100)+" ")])],1),"OrderManage"===t.place?n("ARow",{attrs:{justify:"end",type:"flex"}},[n("ACol",[n("van-button",{style:{height:"35px","margin-right":"5px",width:"25vw"},attrs:{color:"orange",round:"",type:"info"},on:{click:t.toOrderDetail}},[t._v("查看详情 ")])],1)],1):t._e(),"ShopManage"===t.place&&"待发货"===t.order.itemName?n("ARow",{attrs:{justify:"end",type:"flex"}},[n("ACol",[n("van-button",{style:{height:"35px","margin-right":"5px",width:"25vw"},attrs:{color:"orange",round:"",type:"info"},on:{click:t.postGoods}},[t._v("我已发货 ")])],1)],1):t._e()],1)},a=[],r=(n("a9e3"),{props:{place:String,order:null,value:Number},name:"Card",data:function(){return{buttonType:null,goodAmount:0}},methods:{toOrderDetail:function(){this.$store.state.orderId=this.order.orderId,this.$router.push({path:"/OrderDetail"})},postGoods:function(){this.$emit("postgood")}}}),i=r,s=(n("8558"),n("2877")),c=Object(s["a"])(i,o,a,!1,null,"4c06663b",null);e["a"]=c.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{299:function(t,n,e){var content=e(316);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(41).default)("25aa3db0",content,!0,{sourceMap:!1})},315:function(t,n,e){"use strict";e(299)},316:function(t,n,e){(n=e(40)(!1)).push([t.i,".axios-body[data-v-063af892]{word-break:break-all}.block-ui[data-v-063af892]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5)}.block-ui .spinner-border[data-v-063af892]{position:absolute;top:50%;left:50%;width:4rem;height:4rem;color:#d9230f!important;margin:-2rem 0 0 -2rem}",""]),t.exports=n},337:function(t,n,e){"use strict";e.r(n);e(16),e(53),e(62),e(63);var o=e(19),r={data:function(){return{axiosData:null,blockShow:!1}},mounted:function(){this.fnAxiosAsyncTest()},methods:{fnAxiosAsyncTest:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.blockShow=!0,n.next=3,t.$axios.get("/posts").then((function(data){}));case 3:return n.next=5,t.$axios.get("/comments").then((function(data){}));case 5:return n.next=7,t.$axios.get("/albums").then((function(data){}));case 7:return n.next=9,t.$axios.get("/photos").then((function(data){}));case 9:return n.next=11,t.$axios.get("/todos").then((function(data){t.axiosData=JSON.stringify(data)})).then((function(){})).then((function(){})).then((function(){})).then((function(){t.blockShow=!1}));case 11:case"end":return n.stop()}}),n)})))()},fnAxiosAsyncChainTest:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var e;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.blockShow=!0,e=[t.$axios.get("/posts"),t.$axios.get("/comments"),t.$axios.get("/albums"),t.$axios.get("/photos"),t.$axios.get("/todos")],n.next=4,Promise.all(e).then((function(n){t.blockShow=!1}));case 4:case"end":return n.stop()}}),n)})))()},fnAxiosSyncTest:function(){var t=this;this.blockShow=!0;var n=[this.$axios.get("/posts"),this.$axios.get("/comments"),this.$axios.get("/albums"),this.$axios.get("/photos"),this.$axios.get("/todos")];Promise.all(n).then((function(n){t.blockShow=!1}))}}},c=(e(315),e(23)),component=Object(c.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container"},[e("br"),t._v(" "),e("NuxtLink",{staticClass:"btn btn-dark",attrs:{to:"/"}},[t._v("Index page")]),t._v(" "),e("NuxtLink",{staticClass:"btn btn-dark",attrs:{to:"/main"}},[t._v("Main Page")]),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),e("p",[t._v("Console에서 확인")]),t._v(" "),e("div",{staticClass:"p-grid button-demo"},[e("div",{staticClass:"p-col-12 p-md-6"},[e("div",{staticClass:"card"},[e("b-button",{staticClass:"p-mr-2 p-mb-2",attrs:{type:"button"},on:{click:function(n){return t.fnAxiosAsyncTest()}}},[t._v("Axios Test - Call 5 API (Request step by step)")]),t._v(" "),e("br"),t._v(" "),e("b-button",{staticClass:"p-mr-2 p-mb-2",attrs:{type:"button"},on:{click:function(n){return t.fnAxiosAsyncChainTest()}}},[t._v("Axios Test - Call 5 API (Request all with Async)")]),t._v(" "),e("br"),t._v(" "),e("b-button",{staticClass:"p-mr-2 p-mb-2",attrs:{type:"button"},on:{click:function(n){return t.fnAxiosSyncTest()}}},[t._v("Axios Test - Call 5 API (Request all)")])],1)])]),t._v(" "),e("div",{staticClass:"axios-body"},[t._v("\n\t\t"+t._s(t.axiosData)+"\n\t")]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.blockShow,expression:"blockShow"}],staticClass:"block-ui"},[e("b-spinner",{attrs:{label:"Spinning"}})],1)],1)}),[],!1,null,"063af892",null);n.default=component.exports}}]);
var info=location.search.substring(1).split('=')[1];

$.ajax({
            type: 'get',
            url: 'detail.json',
            // 是需要传输的数据
            data: {
                id: info,    
            },
            // 发送类型， 默认是form表单格式
          //   contentType: 'json',
            success: function(res, text, xhr) {
                var str='';
                var str1='';
              for(var i=0;i<res.length;i++){
                  if(res[i].id==info){
                    //  console.log(res[i])
                   str+=`            <div class="marginleft20">
                 <a href="#3">首页</a>&nbsp;>
                 &nbsp;&nbsp;>
                 <a href="#3">${res[i]['tclassify']}</a>&nbsp;>&nbsp;<a href="#3">${res[i]['classify']}</a>&nbsp;>&nbsp;<a href="#3">${res[i]['title']}</a>
                </div>`

                 str1+=` <div class="largebox"><img src=${res[i]['largeimg']}></div>
               <div class="ProductImageList">
                  
                   <div class="middlebox">
                       <img src=${res[i]['midimg']} class="middleimg">
                       <div class="filter"></div>
                     
                   </div>
                   <ul class="smallbox">
                       <li><img src="${res[i]['smallimg'][0]}"   data-middle="${res[i]['largeimg']}"></li>
                       <li><img src="http://img.sjgo365.com/ProductImage80/1_27366920.jpg"  data-middle="http://img.sjgo365.com/ProductImage450/27366920.jpg"></li>
                       <li><img src="http://img.sjgo365.com/ProductImage80/2_27366920.jpg"  data-middle="http://img.sjgo365.com/ProductImage450/27366920.jpg"></li>
                       <li><img src="http://img.sjgo365.com/ProductImage80/3_27366920.jpg"  data-middle="http://img.sjgo365.com/ProductImage80/3_27366920.jpg"></li>
                   </ul>

               </div>

               <div class="ProductInfo">
                   <h1 class="ProductName">${res[i]['title']}</h1>
                   <div class="procode">产品编号 : 27366920</div>
                   <div class="vipprice">
               会  员  价   ：<span>${res[i]['price']}</span>
                   </div>
                 <ul class="manylittle">
                     <li>税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：￥7.62</li>
                     <li>商品评价: 已有0人评价</li>
                     <li style="color: red">普通商品，满88元包邮</li>
                     <li>已&nbsp;&nbsp;销&nbsp;&nbsp;售：${res[i]['salenum']}件</li>
                     <li style="color: #DB0303">跨境商品视为海外购买，暂不支持开发票</li>
                     <li class="buycount"><span>购买数量:</span>
                         <a href="##">-</a><input type="text" value="1"><a href="##">+</a>
                     </li>
                    
                     <li class="addshopcart "><a href="shoppingcart.html">加入购物车</a><a href="##">加关注</a></li>
                 </ul>

               </div>`
             $('.productdetailnav').append(str)
             $('.fdjmain').append(str1)


  //    首先给每一个小盒子加事件然后获取自定义属性赋值给中盒子大盒子
        $('.smallbox>li').on('click', function () {

var durl = $(this).find('img').attr('data-middle')
$('.middlebox').find('img').attr('src', durl)
$('.largebox').find('img').attr('src', durl)


})
//  拖动三剑客，这里可以链式调用哦！！！注意转jQuery元素为dom元素
$('.middlebox').mouseover(function () {
$('.largebox').show();
$('.filter').show();

}).mousemove(function (ev) {
ev = ev || window.event;
var l = ev.clientX - $('.middlebox')[0].offsetLeft - $('.filter')[0].offsetWidth / 2;
var t = ev.clientY - $('.middlebox')[0].offsetTop - $('.filter')[0].offsetHeight / 2;

//    如果页面滚动那么要加上一个滚动高度，因为不滚动的时候滚动距离是0，所以默认给它加上也没关系
if(document.documentElement.scrollTop){
    t = t + document.documentElement.scrollTop;
}

//  console.log(l,t)

var maxL = $('.middlebox')[0].clientWidth - $('.filter')[0].offsetWidth;
var maxT = $('.middlebox')[0].clientHeight - $('.filter')[0].offsetHeight;
//边界处理
if (l > maxL) {
    l = maxL
} else if (l < 0) {
    l = 0
}
if (t > maxT) {
    t = maxT
} else if (t < 0) {
    t = 0
}

// 移动小盒子
$('.filter')[0].style.left = l + 'px'
$('.filter')[0].style.top = t + 'px'
// 移动大图片
$('.largebox').find('img')[0].style.left = -2 * l + 'px'
$('.largebox').find('img')[0].style.top = -2 * t + 'px'


}).mouseout(function () {
$('.largebox').hide();
$('.filter').hide();
})




                  }
              }
                //    console.log('请求成功',res);
                
                
            },
            error: function() {
                // 发送ajax 请求失败，服务端不能做正常的处理
                console.log('请求失败');
            },
            // 无论成功还是失败，都会执行该函数
            complete: function() {
                console.log('请求完成');
            }
        })
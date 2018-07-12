     
     var fade=(function () {
        var imgbox=$('.imgbox');
        var uubox=$('.uubox');
        var timer=null;
        var index=0;
        var abtnl=$('.arrowleft');
        var abtnr=$('.arrowright');
        var banner=$('.banner');
        return{
          //   初始化函数
            innit(){
                this.events();
                this.autoplay(index);
            },
          //   展示图片的函数
            showimage(index){
              uubox.children('a').eq(index).addClass('active').siblings().removeClass('active');
              imgbox.children('li').eq(index).fadeIn().siblings().fadeOut();


            },
          //   自动播放的函数
            autoplay(index){
                var _this=this;
                clearInterval(timer);
                timer=setInterval(function(){
                index++;
                if(index==imgbox.children('li').length){
                    index=0;
                }
                _this.showimage(index);
                },2000)
            },
         // 总事件函数
            events(){
              var _this=this;
              uubox.children('a').on('mouseenter',function(){
                  index=$(this).index();
                  _this.showimage(index);
                  _this.autoplay(index);
              });
              abtnl.on('click',function(){
                 index--;
                 if(index==-1){
                     index=imgbox.children('li').length-1;
                 }
                 _this.showimage(index);
                 _this.autoplay(index);



              });
              abtnr.on('click',function(){
                 index++;
                 if(index==imgbox.children('li').length){
                     index=0;
                  }
                 _this.showimage(index);
                 _this.autoplay(index);

              })
              banner.on('mouseenter',function(){
                 abtnl.css({'display':'block'})
                 abtnr.css({'display':'block'})
              })
              banner.on('mouseleave',function(){
                 abtnl.css({'display':'none'})
                 abtnr.css({'display':'none'})
              })




            }


        }
     })()
     fade.innit();
 
  
   
    
    $.get('obj.json',function(data){
      console.log(data);
  var activityli=$('.activity-list>ul');
  var mzg=$('.floor-product-list').eq(0);
  console.log(mzg);
   var str='';
   var str1='';
   for(var i=0;i<data["activity"].length;i++){
      // console.log(data[i]['imglink'])
       str += `
       <li>  <a href="##">   
              <p class="activity-item-title">${data["activity"][i]['tiltle']}</p>
              <p class="activity-item-divider">${data["activity"][i]['subtitle']}</p>
              <img src=${data["activity"][i]['imglink']} />
              
      </a>
      <p class="notebanner">正品低价，必买清单</p>
  </li>
       `
   }
   activityli.append(str);

  console.log(data["mzg"]);

  for(var i=0;i<data["mzg"].length;i++){
      // console.log(data[i]['imglink'])
       str1 += `
  <li class="daily-product-item" >
  <a href="detail.html?id=${data["mzg"][i]["id"]}" class="dp-item-link">
      <img src="${data["mzg"][i]["imgsrc"]}">
      <p class="dp-item-text">${data["mzg"][i]["text"]}</p>
      <p class="dp-item-price">
          <span class="dp-sale-price">${data["mzg"][i]["saleprice"]}</span>
          <span class="dp-market-price">${data["mzg"][i]["marketprice"]}</span>
      </p>
  </a>
  </li>
       `
   }
   mzg.append(str1);

// 鼠标移上去有一个条上来的效果 代码为啥不执行了？!!!!!!因为ajax是异步的所以在队列的最后所以要在里面执行！！！！！
//通过ajax请求的渲染的元素为啥找不到？？
    ( function(){
      var aa=$('.activity-list>ul>li');
  
     console.log(aa)
     
     aa.on('mouseenter',function(){
      $(this).children('p').animate({top:'300px'},300)
        
     })
     aa.on('mouseleave',function(){
      $(this).children('p').animate({top:'350px'},300)
        
     })
    })()

    },'json')
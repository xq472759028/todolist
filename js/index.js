/*

1.内容
2.绘制内容，把数组分成两类
3.事件委派，删除，重汇

 */
$(function () {
    // let arr=[
    //     {id:1,content:'abin1',status:false},
    //     {id:2,content:'abin2',status:true},
    //     {id:3,content:'abin3',status:false},
    //     {id:4,content:'abin4',status:true},
    //     {id:5,content:'abin5',status:false},
    //     {id:6,content:'abin6',status:true}
    // ];
    // let nextId=7;
    let arr=[];
    let nextId=0;
    localStorage.nextId=nextId;
    function render(){
        let str1='';
        let str2='';
        let count1=0;
        let count2=0;
        if (localStorage.data){
            arr=JSON.parse(localStorage.data)
        }
        arr.forEach(function(val){
            if (!val.status) {
                str1+=`<li id="${val.id}"><input type="checkbox" class="danxuan"><p>${val.content}</p><a href="javascript:;" class="del">-</a></li>`;
                count1++;
            }else{
                str2+=`<li id="${val.id}"><input type="checkbox" class="danxuan" checked><p>${val.content}</p><a href="javascript:;" class="del">-</a></li>`;
                count2++;
            }
        })

        $("#todolist").html(str1);
        $("#donelist").html(str2);
        $('#todocount').html(count1);
        $('#donecount').html(count2);
    }
    render();
    $('section').on('click','.del',function () {
        let idd=$(this).closest('li').attr('id');
        let index=arr.findIndex(val=>val.id==idd)
        arr.splice(index,1);
        localStorage.data=JSON.stringify(arr);
        render();
    }).on('click','p',function () {
        let idd=$(this).closest('li').attr('id');
        let index=arr.findIndex(val=>val.id==idd)
        let input=$('<input>');
        let neirong= $(this).text();
        $(this).html('');
        $(this).append(input.val(neirong));
        input.focus();
        input.blur(function () {
            if (!input.val()){
                alert('不能为空值')
                input.val(neirong)
            }
            arr[index].content=input.val();
            localStorage.data=JSON.stringify(arr);
            render();
        })
    }).on('click','li>input',function () {
        let idd=$(this).closest('li').attr('id');
        let index=arr.findIndex(val=>val.id==idd)
        arr[index].status=!arr[index].status;
        localStorage.data=JSON.stringify(arr);
        render();
    });

    $('#title').keyup(function (e) {
        if(e.which==13){
            nextId=localStorage.nextId;
            arr.push({id:nextId,content:$(this).val(),status:false});
            localStorage.data=JSON.stringify(arr);
            nextId++;
            localStorage.nextId=nextId;
            render();
        }
    })
    $('footer a').click(function () {
        arr=JSON.parse(localStorage.data);
        arr=[];
        localStorage.data=JSON.stringify(arr);
        // localStorage.nextId=0;
        $('#todolist').html('');
        $('#donelist').html('');
    })
})

// 获取id唯一标记的内容
var canvas = document.getElementById("myCanvas");
var canvasShow = document.getElementById("myCanvasShow")
// 获取上下文
var context = canvas.getContext("2d");
var contextShow = canvasShow.getContext("2d");
// 标记：判断是否划线
var isDrawline = false;

// 判断是否是画笔状态
var isDrawState = false;
// 标记：判断是否是黑板擦状态
var isEarserState = false;


/**
// * 判断元素是否可见
// * @param el{dom}: dom元素
// * @eg: isVisible(document.querySelector(cssSelector));
// **/
// function isVisible(el) {
//     var loopable = true,
//         visible = getComputedStyle(el).display != 'none' && getComputedStyle(el).visibility != 'hidden';

//     while(loopable && visible) {
//         el = el.parentNode;

//         if(el && el != document.body) {
//             visible = getComputedStyle(el).display != 'none' && getComputedStyle(el).visibility != 'hidden';
//         }else {
//             loopable = false;
//         }
//     }

//     return visible;
// }


// 设定画笔按钮执行事件
function paintingBrush() {
    document.getElementById("myCanvasShow").style.display = "none";
    // 当鼠标按下时
    canvas.onmousedown = function (event) {
        isDrawline = true;
        context.beginPath();
        context.moveTo(event.offsetX, event.offsetY);
    };

    // 当鼠标移动时
    canvas.onmousemove = function (event) {
        if (isDrawline) {
            var color = document.querySelector("#colorSelect");
            var value = color.value;
            context.strokeStyle = value.toString();

            var valueTwo = document.getElementById("range").value;
            context.lineWidth = Number(valueTwo);
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
        };
    };

    // function color4(event) {
    //     var valueTwo = document.getElementById("range").value;
    //     context.lineWidth = Number(valueTwo);
    // }

    // 当鼠标抬起时
    canvas.onmouseup = function () {
        isDrawline = false;
    };
};

//设置画笔颜色
function colorChange() {
    let color = document.getElementById("strokeColor").value;
    context.strokeStyle = color;
};

// //设置画笔宽度
// function strokeWidthChange() {
//     let width = document.getElementById("strokeWidth").value
//     context.lineWidth = width;
// };




//设置黑板擦按钮执行事件
function clear() {
    canvas.onmousemove = function (event) {
        var x = event.pageX - canvas.offsetLeft - (10 / 2);
        var y = event.pageY - canvas.offsetTop - (10 / 2);
        context.clearRect(x, y, 10, 10);
    };
};

function eraser() {
    canvas.onmousedown = clear();
    canvas.onmouseup = function () {
        canvas.onmousemove = null;
    };
};

function eraserWidth() {
    canvas.onmousedown = clear;
    canvas.onmouseup = function () {
        canvas.onmousemove = null;
    };

    function clear() {
        canvas.onmousemove = function (event) {
            var w = document.getElementById("eraser").value;
            var h = 20
            var x = event.pageX - canvas.offsetLeft - w / 2;
            var y = event.pageY - canvas.offsetTop - h / 2;
            context.clearRect(x, y, w, h);
        };
    };
};

function clearAll() {
    context.fillStyle = "slategray";
    context.beginPath();
    context.fillRect(0, 0, 1350, 1000);
    context.closePath();
};

//区域擦除
function cleanArea() {
    var locus = new Array();
    document.getElementById("myCanvasShow").style.display = "block";
    context.fillStyle = "slategray";
    contextShow.strokeStyle = "red";
    canvasShow.onmousedown = function (event) {
        isDrawline = true;
        context.beginPath();
        contextShow.beginPath();
        contextShow.moveTo(event.offsetX, event.offsetY);
    };

    canvasShow.onmousemove = function (event) {
        if (isDrawline) {
            contextShow.lineTo(event.offsetX, event.offsetY);
            contextShow.stroke();
            var xy = [event.offsetX, event.offsetY];
            locus.push(xy);
            for (var i = 0; i < locus.length; i++) {
                context.lineTo(locus[i][0], locus[i][1]);
            };
        };
    };

    canvasShow.onmouseup = function () {
        isDrawline = false;
        locus = [];
        context.fill();
        contextShow.clearRect(0, 0, 1200, 1000);
    };

};

//
function downloadCanvasImage(selector, name) {
    var canvas1 = document.querySelector(selector);
    var url = canvas1.toDataURL('image/png');
    var a = document.createElement('a');
    var event = new MouseEvent('click')
    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    a.download = name || '下载图片名称'
    // 将生成的URL设置为a.href属性
    a.href = url
    a.dispatchEvent(event)
        ;
}

// 点击调用保存按钮的点击事件
var save = document.getElementById("save");
save.addEventListener("click", function () {
    downloadCanvasImage('canvas', '图片名称')
})

var colorDIS = document.getElementById("colorSelect");
// var colorBIS = document.getElementById("colorSelectBtn")
var colorState = colorDIS.style.visibility;

// colorBIS.addEventListener("click",function() {
//     if (colorDIS.style.visibility == "hidden")
//         {colorDIS.style.visibility = "visible";}
//     else {colorDIS.style.visibility = "hidden"}
// });

function color1() {
    // debugger
    if (colorDIS.style.visibility == "visible") {

        colorDIS.style.visibility = "hidden";
    }
    else {
        colorDIS.style.visibility = "visible";
    };
    // console.log(colorState)
};



// function color1 () {
//     if (isVisible(colorDIS)) {
//         debugger
//         getComputedStyle(colorDIS).display == 'none' && getComputedStyle(colorDIS).visibility == 'hidden';
//     } else {
//         getComputedStyle(colorDIS).display != 'none' && getComputedStyle(colorDIS).visibility != 'hidden';
//     };
// };



var x0 = 0;
var y0 = 0;
function drawStraightLine() {
    document.getElementById("myCanvasShow").style.display = "block";
    // 当鼠标按下时
    canvasShow.onmousedown = function (event) {
        isDrawline = true;
        x0 = event.offsetX;
        y0 = event.offsetY;
        // debugger;
        context.beginPath();
        // contextShow.beginPath();
        // contextShow.moveTo(x0,y0);
    };

    // 当鼠标移动时
    var x1 = 0;
    var y1 = 0;
    canvasShow.onmousemove = function (event) {
        if (isDrawline) {
            // var color = document.querySelector("#colorSelect");
            // var value = color.value;
            // context.strokeStyle = value.toString();

            // var valueTwo = document.getElementById("range").value;
            // context.lineWidth = Number(valueTwo); 
            contextShow.clearRect(0, 0, 1200, 1000);
            contextShow.beginPath();
            contextShow.moveTo(x0, y0);
            x1 = event.offsetX;
            y1 = event.offsetY;
            contextShow.lineTo(x1, y1);
            contextShow.closePath();

            // context.lineTo(event.offsetX,event.offsetY);
            contextShow.stroke();
        };
    };

    // 当鼠标抬起时
    canvasShow.onmouseup = function () {
        isDrawline = false;
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.closePath();
        context.stroke();
        contextShow.clearRect(0, 0, 1200, 1000);
    };
};

function drawRectangle() {
    document.getElementById("myCanvasShow").style.display = "block";
    // 当鼠标按下时
    canvasShow.onmousedown = function (event) {
        isDrawline = true;
        x0 = event.offsetX;
        y0 = event.offsetY;
        context.beginPath();
    };

    // 当鼠标移动时
    var x1 = 0;
    var y1 = 0;

    canvasShow.onmousemove = function (event) {
        if (isDrawline) {
            // var color = document.querySelector("#colorSelect");
            // var value = color.value;
            // context.strokeStyle = value.toString();

            // var valueTwo = document.getElementById("range").value;
            // context.lineWidth = Number(valueTwo); 
            contextShow.clearRect(0, 0, 1200, 1000);
            contextShow.beginPath();
            x1 = event.offsetX;
            y1 = event.offsetY;
            let width = (x1 - x0);
            let height = (y1 - y0);
            contextShow.strokeRect(x0, y0, width, height);
            contextShow.closePath();
            contextShow.stroke();
        };
    };

    // 当鼠标抬起时
    canvasShow.onmouseup = function () {
        isDrawline = false;
        let width = (x1 - x0);
        let height = (y1 - y0);
        context.strokeRect(x0, y0, width, height);
        context.closePath();
        context.stroke();
        contextShow.clearRect(0, 0, 1200, 1000);
    };
};

// function drawRegularTriangle() {
//     document.getElementById("myCanvasShow").style.display = "block";
//     // 当鼠标按下时
//     canvasShow.onmousedown = function (event) {
//         isDrawline = true;
//         x0 = event.offsetX;
//         y0 = event.offsetY;
//         context.beginPath();
//     };

//     // 当鼠标移动时
//     var x1 = 0;
//     var y1 = 0;

//     canvasShow.onmousemove = function (event) {
//         if (isDrawline) {
//             // var color = document.querySelector("#colorSelect");
//             // var value = color.value;
//             // context.strokeStyle = value.toString();

//             // var valueTwo = document.getElementById("range").value;
//             // context.lineWidth = Number(valueTwo); 
//             contextShow.clearRect(0, 0, 1200, 1000);
//             contextShow.beginPath();
//             x1 = event.offsetX;
//             y1 = event.offsetY;
//             let width = Math.abs(x1-x0);
//             let height = Math.abs(y1-y0);
//             contextShow.strokeRect(x0,y0,width,height);
//             contextShow.closePath();
//             contextShow.stroke();
//         };
//     };

//         // 当鼠标抬起时
//         canvasShow.onmouseup = function() {
//             isDrawline = false;
//             let width = Math.abs(x1-x0);
//             let height = Math.abs(y1-y0);
//             context.strokeRect(x0,y0,width,height);
//             context.closePath();
//             context.stroke();
//             contextShow.clearRect(0, 0, 1200, 1000);
//         };
// }

function drawCircular() {
    document.getElementById("myCanvasShow").style.display = "block";
    // 当鼠标按下时
    canvasShow.onmousedown = function (event) {
        isDrawline = true;
        x0 = event.offsetX;
        y0 = event.offsetY;
        context.beginPath();
        // contextShow.moveTo(x0,y0)
        console.log(x0,y0);
    };

    // 当鼠标移动时
    var x1 = 0;
    var y1 = 0;
    var radius = 0
    canvasShow.onmousemove = function (event) {
        if (isDrawline) {
            var color = document.querySelector("#colorSelect");
            var value = color.value;
            context.strokeStyle = value.toString();

            var valueTwo = document.getElementById("range").value;
            context.lineWidth = Number(valueTwo); 
            contextShow.clearRect(0, 0, 1200, 1000);
            contextShow.beginPath();
            x1 = event.offsetX;
            y1 = event.offsetY;
            radius =  Math.sqrt((x1 - x0)**2 + (y1 - y0)**2);
            console.log('x1='+x1+",y1="+y1+ ',x0=' + x0 +',y0=' + y0 );
            console.log('radius:' + radius)
            contextShow.arc(x0, y0, radius, 0 * Math.PI, 2 * Math.PI);
            contextShow.closePath();
            contextShow.stroke();
        };
    };

    // 当鼠标抬起时
    canvasShow.onmouseup = function () {
        isDrawline = false;
        // x1 = event.offsetX;
        // y1 = event.offsetY;
        context.arc(x0, y0, radius, 0 * Math.PI, 2 * Math.PI);
        context.closePath();
        context.stroke();
        contextShow.clearRect(0, 0, 1200, 1000);
    };
};
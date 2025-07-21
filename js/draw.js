export function initDraw() {
    const root = document.querySelector('.draw-app');
    if (!root) return;
    const canvas = root.querySelector("canvas"),
        toolBtns = root.querySelectorAll(".tool"),
        fillColor = root.querySelector("#fill-color"),
        sizeSlider = root.querySelector("#size-slider"),
        colorBtns = root.querySelectorAll(".colors .option"),
        colorPicker = root.querySelector("#color-picker"),
        clearCanvas = root.querySelector(".clear-canvas"),
        saveImg = root.querySelector(".save-img");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let prevMouseX, prevMouseY, snapshot,
        isDrawing = false,
        selectedTool = "brush",
        brushWidth = 5,
        selectedColor = "#000";

    const setCanvasBackground = () => {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = selectedColor;
    };

    // Đảm bảo canvas chiếm hết vùng trắng bên phải
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    setCanvasBackground();

    const drawRect = (e) => {
        if(!fillColor.checked) {
            return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
        }
        ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    };

    const drawCircle = (e) => {
        ctx.beginPath();
        let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
        ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
        fillColor.checked ? ctx.fill() : ctx.stroke();
    };

    const drawTriangle = (e) => {
        ctx.beginPath();
        ctx.moveTo(prevMouseX, prevMouseY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
        ctx.closePath();
        fillColor.checked ? ctx.fill() : ctx.stroke();
    };

    const startDraw = (e) => {
        isDrawing = true;
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
        ctx.beginPath();
        ctx.lineWidth = brushWidth;
        ctx.strokeStyle = selectedColor;
        ctx.fillStyle = selectedColor;
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };

    const drawing = (e) => {
        if(!isDrawing) return;
        ctx.putImageData(snapshot, 0, 0);
        if(selectedTool === "brush" || selectedTool === "eraser") {
            ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        } else if(selectedTool === "rectangle"){
            drawRect(e);
        } else if(selectedTool === "circle"){
            drawCircle(e);
        } else {
            drawTriangle(e);
        }
    };

    toolBtns.forEach(btn => {
        btn.onclick = () => {
            root.querySelector(".options .active").classList.remove("active");
            btn.classList.add("active");
            selectedTool = btn.id;
        };
    });

    sizeSlider.onchange = () => brushWidth = sizeSlider.value;

    colorBtns.forEach(btn => {
        btn.onclick = () => {
            root.querySelector(".options .selected").classList.remove("selected");
            btn.classList.add("selected");
            selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
        };
    });

    colorPicker.onchange = () => {
        colorPicker.parentElement.style.background = colorPicker.value;
        colorPicker.parentElement.click();
    };

    clearCanvas.onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setCanvasBackground();
    };

    saveImg.onclick = () => {
        const link = document.createElement("a");
        link.download = `${Date.now()}.jpg`;
        link.href = canvas.toDataURL();
        link.click();
    };

    canvas.onmousedown = startDraw;
    canvas.onmousemove = drawing;
    canvas.onmouseup = () => isDrawing = false;
}
// Export function để khởi tạo image editor
export function initEdit() {
    const container = document.querySelector('.edit-container');
    if (!container || container.dataset.initialized) return;
    container.dataset.initialized = 'true';

    const fileInput = container.querySelector('.file-input');
    const filterOptions = container.querySelectorAll('.filter button');
    const filterName = container.querySelector('.filter-info .name');
    const filterValue = container.querySelector('.filter-info .value');
    const filterSlider = container.querySelector('.slider input');
    const rotateOptions = container.querySelectorAll('.rotate button');
    const previewImg = container.querySelector('.preview-img img');
    const resetFilterBtn = container.querySelector('.reset-filter');
    const chooseImgBtn = container.querySelector('.choose-img');
    const saveImgBtn = container.querySelector('.save-img');
    const placeholder = container.querySelector('.preview-img .placeholder');

    let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
    let rotate = 0, flipHorizontal = 1, flipVertical = 1;

    const applyFilter = () => {
        previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
        previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    }

    const updateFilter = () => {
        filterValue.innerText = `${filterSlider.value}%`;
        const selectedFilter = container.querySelector(".filter .active");
        if(selectedFilter.id === "brightness") {
            brightness = filterSlider.value;
        } else if(selectedFilter.id === "saturation") {
            saturation = filterSlider.value;
        } else if(selectedFilter.id === "inversion") {
            inversion = filterSlider.value;
        } else {
            grayscale = filterSlider.value;
        }
        applyFilter();
    }

    filterOptions.forEach(option => {
        option.addEventListener("click", () => {
            container.querySelector(".active").classList.remove("active");
            option.classList.add("active");
            filterName.innerText = option.innerText;
            if(option.id === "brightness") {
                filterSlider.max = "200";
                filterSlider.value = brightness;
                filterValue.innerText = `${brightness}%`;
            } else if(option.id === "saturation") {
                filterSlider.max = "200";
                filterSlider.value = saturation;
                filterValue.innerText = `${saturation}%`;
            } else if(option.id === "inversion") {
                filterSlider.max = "100";
                filterSlider.value = inversion;
                filterValue.innerText = `${inversion}%`;
            } else {
                filterSlider.max = "100";
                filterSlider.value = grayscale;
                filterValue.innerText = `${grayscale}%`;
            }
        });
    });

    filterSlider.addEventListener("input", updateFilter);

    rotateOptions.forEach(option => {
        option.addEventListener("click", () => {
            if(option.id === "left") {
                rotate -= 90;
            } else if(option.id === "right") {
                rotate += 90;
            } else if(option.id === "horizontal") {
                flipHorizontal = flipHorizontal === 1 ? -1 : 1;
            } else {
                flipVertical = flipVertical === 1 ? -1 : 1;
            }
            applyFilter();
        });
    });

    const resetFilter = () => {
        brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
        rotate = 0; flipHorizontal = 1; flipVertical = 1;
        // Đặt lại UI filter về mặc định
        filterOptions.forEach(btn => btn.classList.remove('active'));
        filterOptions[0].classList.add('active');
        filterName.innerText = filterOptions[0].innerText;
        filterSlider.max = "200";
        filterSlider.value = brightness;
        filterValue.innerText = `${brightness}%`;
        applyFilter();
    }

    const saveImage = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if(rotate !== 0) {
            ctx.rotate(rotate * Math.PI / 180);
        }
        ctx.scale(flipHorizontal, flipVertical);
        ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = canvas.toDataURL();
        link.click();
    }

    resetFilterBtn.addEventListener("click", resetFilter);
    saveImgBtn.addEventListener("click", saveImage);
    chooseImgBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
        let file = fileInput.files[0];
        if (!file) return;
        previewImg.src = URL.createObjectURL(file);
        previewImg.onload = () => {
            container.classList.remove("disabled");
            if (placeholder) placeholder.style.display = 'none';
            resetFilter();
        };
    });
}
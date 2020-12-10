//let uploadInput = document.querySelector('.form__add__upload-img');

let uploadInput = document.getElementById('upload_image_input');

let uploadedImage = {
    container: document.querySelector('.form__add__uploaded-img'),
    icon: document.querySelector('.form__add__uploaded-img-icon'),
    name: document.querySelector('.form__add__uploaded-img-name')
};

let fileReader = new FileReader();
let image = new Image();

let imageData = {
    url: null,
    fileName: null
};

uploadInput.addEventListener('change', () => {
    console.log("change");
    let file = uploadInput.files[0];

    if(file.type && file.type.search("image/+(jpeg|png)") != -1){
        fileReader.readAsDataURL(file);
        imageData.fileName = file.name;

        if(file.name.length > 20){
            imageData.fileName = imageData.filename.slice(0, 20) + "..." + file.type.match("jpeg|png");
        }
    }
});

fileReader.addEventListener('load', (e) => {
    console.log("load1");
    let url = e.target.result;
    image.src = url;
    imageData.url = url;
});

let displayUploadedImage = () => {
    uploadedImage.container.classList.toggle('.form__add__uploaded-img--active');
    uploadedImage.icon.src = imageData.url;
    uploadedImage.name.innerHTML = imageData.fileName;
};

image.addEventListener('load', function() {
    console.log("load2");
    let width = this.width;
    let height = this.height;

    displayUploadedImage();

    // if (width && height && width <= 270 && height <= 270) {
    //     displayUploadedImage();
    // }
});
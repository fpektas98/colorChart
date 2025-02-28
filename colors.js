let pickColor = document.querySelectorAll('.p-4');

// Seçilen rengi globalde tutmak için
let selectedColor = null;

pickColor.forEach((color) => {
    const colorCode = document.createElement('span'); // Renk kodunu gösterecek span
    colorCode.classList.add('color-code');
    color.appendChild(colorCode); // Renk kutusunun içine renk kodu ekle

    color.addEventListener('click', function () {
        // RGB formatında alınan renk
        selectedColor = window.getComputedStyle(this).backgroundColor;
    });

    // Mouse ile renk kutusunun üzerine geldiğinde renk kodunu göster
    color.addEventListener('mouseover', function () {
        let bgColor = getComputedStyle(this).backgroundColor;
        let hexColor = rgbToHex(bgColor);
        colorCode.textContent = hexColor;  // Renk kodunu kutuya yaz

        // Yazının kontrast rengi
        this.style.color = getContrastColor(bgColor);

        // Mouse over olduğunda padding'i sıfırlama
        this.classList.add('hovered');
    });

    // Mouse dışarı çıktığında renk kodunu gizle ve eski stil geri gelsin
    color.addEventListener('mouseout', function () {
        colorCode.textContent = '';  // Mouse dışarı çıkınca metni temizle
        this.classList.remove('hovered'); // Hover durumunu kaldır
    });
});

function rgbToHex(rgb) {
    let result = rgb.match(/\d+/g);  // RGB değerlerini sayılara ayır
    let r = parseInt(result[0]).toString(16).padStart(2, '0');
    let g = parseInt(result[1]).toString(16).padStart(2, '0');
    let b = parseInt(result[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

function getContrastColor(rgbColor) {
    let hexColor = rgbToHex(rgbColor); // RGB'yi HEX'e çevir
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white'; // Kontrast rengi belirler
}

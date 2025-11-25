function rd(url) {
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("raspi").addEventListener("click", () => {
        document.body.innerHTML = `
            <center>
                <h1>Essentials</h1>
                <button onclick="rd('https://www.pishop.us/product/raspberry-pi-5-4gb/?src=raspberrypi')">Raspberry Pi 5</button>
                <button onclick="rd('https://www.pishop.us/product/raspberry-pi-27w-usb-c-power-supply-white-us/')">Raspberry Pi 5 Power Supply</button>
                <button onclick="rd('https://www.pishop.us/product/official-raspberry-pi-microsd-card-with-raspberry-pi-os-64-bit-64gb/')">Raspberry Pi 5 OS SD Card</button><br>
                <h1>Optional</h1>
                <button onclick="rd('https://www.pishop.us/product/raspberry-pi-case-for-pi-5-red-white/')">Raspberry Pi 5 Case</button><br><br>
                <button onclick="window.location.reload()">Back</button>
            </center>`
    });
});
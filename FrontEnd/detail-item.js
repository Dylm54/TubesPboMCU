const itemNameElement = document.getElementById('item-name');
const itemPriceElement = document.getElementById('item-price');
const itemDescriptionElement = document.getElementById('item-description');
const backButton = document.querySelector('.back-button');
const orderButton = document.querySelector('.order-button')
const apiUrl = 'http://localhost:8080'

document.addEventListener('DOMContentLoaded', async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idItem = urlParams.get('id');
    console.log(idItem)

    try {
        const response = await fetch(`${apiUrl}/api/admin/findPaketbyId/${idItem}`);
        if (!response.ok) {
            throw new Error('Network response paket was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data)

        itemNameElement.textContent = data.namaPaket
        itemPriceElement.textContent = `Rp${data.harga}`
        itemDescriptionElement.textContent = data.deskripsiPaket || 'Deskripsi tidak tersedia.';

        orderButton.addEventListener('click', () => {
            window.location.href = `SettingSchedule.html?idPaket=${idItem}`
        })

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }


});
const container = document.getElementById('container');
const registerBtnAnimation = document.getElementById('register');
const loginBtnAnimation = document.getElementById('login');

const registerBtn = document.getElementById('submitRegisterUser');
const inputNamaRegis = document.getElementById('registerNamaUser');
const inputHandphoneRegis = document.getElementById('registerHandphoneUser');
const inputAlamatRegis = document.getElementById('registerAlamatUser');
const inputPasswordRegis = document.getElementById('registerPasswordUser');

const loginBtn = document.getElementById('submitLoginUser');
const inputHandphoneLogin = document.getElementById('loginHandphoneUser');
const inputPasswordLogin = document.getElementById('loginPasswordUser');


registerBtnAnimation.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtnAnimation.addEventListener('click', () => {
    container.classList.remove("active");
});

registerBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    const namaPasien = inputNamaRegis.value;
    const handphonePasien = inputHandphoneRegis.value;
    const alamatPasien = inputAlamatRegis.value;
    const passwordPasien = inputPasswordRegis.value;

    const newPasien = {
        nama: namaPasien,
        noTelp: handphonePasien,
        alamat: alamatPasien,
        password: passwordPasien
    };

    console.log(newPasien)

    try {
        const response = await fetch(`http://localhost:8080/api/auth/register/pasien`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPasien)
        });
        if (response.status === 500) {
            alert("Tidak dapat Sign-Up, No Handphone sudah terdaftar!");
            return;
        }
        if (!response.ok) {
            throw new Error('Network response pendaftaran was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data)
        alert("Berhasil Sign-Up!, Silakan Sign-In untuk melanjutkan");
        window.location.href = "/FrontEnd/Login.html"
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
})

loginBtn.addEventListener('click', async (event) => {
    event.preventDefault()

    const noTelpPasien = inputHandphoneLogin.value;
    const passwordPasien = inputPasswordLogin.value;

    console.log(noTelpPasien)
    console.log(passwordPasien)

    try {
        const response = await fetch(`http://localhost:8080/api/auth/login?noTelp=${noTelpPasien}&password=${passwordPasien}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 500) {
            alert("Nomor handphone atau password salah.");
            return;
        }
        if (!response.ok) {
            throw new Error('Network response pendaftaran was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data)
        document.cookie = `userInfo=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=604800`;
        window.location.href = "/FrontEnd/Pasien-paket.html"
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
})
const registerBtnAnimation = document.getElementById('register');
const loginBtnAnimation = document.getElementById('login');

const registerBtn = document.getElementById('submitRegisterAdmin');
const inputNamaRegis = document.getElementById('registerNamaAdmin');
const inputHandphoneRegis = document.getElementById('registerHandphoneAdmin');
const inputAlamatRegis = document.getElementById('registerAlamatAdmin');
const inputJabatanRegis = document.getElementById('registerJabatanAdmin');
const inputPasswordRegis = document.getElementById('registerPasswordAdmin');

const loginBtn = document.getElementById('submitLoginAdmin');
const inputHandphoneLogin = document.getElementById('loginHandphoneAdmin');
const inputPasswordLogin = document.getElementById('loginPasswordAdmin');

registerBtnAnimation.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtnAnimation.addEventListener('click', () => {
    container.classList.remove("active");
});

registerBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    const namaAdmin = inputNamaRegis.value;
    const handphoneAdmin = inputHandphoneRegis.value;
    const alamatAdmin = inputAlamatRegis.value;
    const jabatanAdmin = inputJabatanRegis.value;
    const passwordAdmin = inputPasswordRegis.value;

    const newAdmin = {
        nama: namaAdmin,
        noTelp: handphoneAdmin,
        alamat: alamatAdmin,
        jabatan: jabatanAdmin,
        password: passwordAdmin
    };

    console.log(newAdmin)

    try {
        const response = await fetch(`http://localhost:8080/api/auth/register/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAdmin)
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
        window.location.href = "/FrontEnd/LoginAdmin.html"
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
})

loginBtn.addEventListener('click', async (event) => {
    event.preventDefault()

    const noTelpAdmin = inputHandphoneLogin.value;
    const passwordAdmin = inputPasswordLogin.value;

    console.log(noTelpAdmin)
    console.log(passwordAdmin)

    try {
        const response = await fetch(`http://localhost:8080/api/auth/login?noTelp=${noTelpAdmin}&password=${passwordAdmin}`, {
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
        document.cookie = `userInfo=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=3600`;
        window.location.href = "/FrontEnd/AdminDashboard.html"
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
})
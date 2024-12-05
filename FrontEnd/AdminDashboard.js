document.addEventListener("DOMContentLoaded", () => {
    const paketData = [];
    const pasienData = [];

    const sectionTitle = document.getElementById("section-title");
    const sections = document.querySelectorAll(".section");
    const navItems = document.querySelectorAll(".nav-item");

    const paketNamaInput = document.getElementById("paket-nama");
    const paketJenisInput = document.getElementById("paket-jenis");
    const paketHargaInput = document.getElementById("paket-harga");
    const tambahPaketBtn = document.getElementById("tambah-paket");
    const paketListTable = document.getElementById("paket-list").querySelector("tbody");

    const laporanDariInput = document.getElementById("laporan-dari");
    const laporanSampaiInput = document.getElementById("laporan-sampai");
    const generateLaporanBtn = document.getElementById("generate-laporan");
    const laporanListTable = document.getElementById("laporan-list").querySelector("tbody");

    const cariPasienInput = document.getElementById("cari-pasien");
    const filterPaketInput = document.getElementById("filter-paket");
    const filterPeriodeMulaiInput = document.getElementById("filter-periode-mulai");
    const filterPeriodeAkhirInput = document.getElementById("filter-periode-akhir");
    const cariBtn = document.getElementById("cari-btn");
    const pasienListTable = document.getElementById("pasien-list").querySelector("tbody");

    function clearTable(tableBody) {
        tableBody.innerHTML = "";
    }

    function renderPaketList() {
        clearTable(paketListTable);
        clearTable(filterPaketInput);

        filterPaketInput.innerHTML = '<option value="">Pilih Paket</option>';

        paketData.forEach((paket, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${paket.nama}</td>
                <td>${paket.jenis}</td>
                <td>${paket.harga}</td>
                <td>
                    <button class="btn-success btn-small" data-index="${index}" onclick="editPaket(${index})">Edit</button>
                    <button class="btn-primary btn-small" data-index="${index}" onclick="hapusPaket(${index})">Hapus</button>
                </td>
            `;
            paketListTable.appendChild(row);

            const option = document.createElement("option");
            option.value = paket.nama;
            option.textContent = paket.nama;
            filterPaketInput.appendChild(option);
        });
    }

    function renderLaporanList(filteredData) {
        clearTable(laporanListTable);
        filteredData.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.periode}</td>
                <td>${item.paket}</td>
                <td>${item.pasien}</td>
                <td>${item.total}</td>
            `;
            laporanListTable.appendChild(row);
        });
    }

    function renderPasienList(filteredData) {
        clearTable(pasienListTable);
        filteredData.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.nama}</td>
                <td>${item.noIdentitas}</td>
                <td>${item.paket}</td>
                <td>${item.tanggal}</td>
            `;
            pasienListTable.appendChild(row);
        });
    }

    tambahPaketBtn.addEventListener("click", () => {
        const nama = paketNamaInput.value.trim();
        const jenis = paketJenisInput.value;
        const harga = parseFloat(paketHargaInput.value);

        if (!nama || !jenis || isNaN(harga)) {
            alert("Mohon lengkapi data paket.");
            return;
        }

        paketData.push({ nama, jenis, harga });
        renderPaketList();

        paketNamaInput.value = "";
        paketJenisInput.value = "";
        paketHargaInput.value = "";
    });

    generateLaporanBtn.addEventListener("click", () => {
        const dari = laporanDariInput.value;
        const sampai = laporanSampaiInput.value;

        if (!dari || !sampai) {
            alert("Mohon pilih periode laporan.");
            return;
        }

        const filteredData = pasienData.filter(pasien => {
            const tanggal = new Date(pasien.tanggal);
            return tanggal >= new Date(dari) && tanggal <= new Date(sampai);
        });

        renderLaporanList(filteredData);
    });

    cariBtn.addEventListener("click", () => {
        const nama = cariPasienInput.value.trim();
        const paket = filterPaketInput.value;
        const periodeMulai = filterPeriodeMulaiInput.value;
        const periodeAkhir = filterPeriodeAkhirInput.value;

        const filteredData = pasienData.filter(pasien => {
            const matchNama = !nama || pasien.nama.toLowerCase().includes(nama.toLowerCase());
            const matchPaket = !paket || pasien.paket === paket;
            const tanggal = new Date(pasien.tanggal);
            const matchPeriode =
                (!periodeMulai || tanggal >= new Date(periodeMulai)) &&
                (!periodeAkhir || tanggal <= new Date(periodeAkhir));

            return matchNama && matchPaket && matchPeriode;
        });

        renderPasienList(filteredData);
    });

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const sectionId = item.getAttribute("data-section");
            sectionTitle.textContent = item.querySelector("span").textContent;

            sections.forEach(section => section.classList.remove("active"));
            navItems.forEach(nav => nav.classList.remove("active"));

            document.getElementById(sectionId).classList.add("active");
            item.classList.add("active");
        });
    });

    window.editPaket = (index) => {
        const paket = paketData[index];
        paketNamaInput.value = paket.nama;
        paketJenisInput.value = paket.jenis;
        paketHargaInput.value = paket.harga;

        tambahPaketBtn.textContent = "Update";
        tambahPaketBtn.onclick = () => {
            paketData[index] = {
                nama: paketNamaInput.value.trim(),
                jenis: paketJenisInput.value,
                harga: parseFloat(paketHargaInput.value),
            };
            renderPaketList();
            tambahPaketBtn.textContent = "Tambah";
            tambahPaketBtn.onclick = tambahPaketBtn._originalClick;
        };
    };

    window.hapusPaket = (index) => {
        if (confirm("Yakin ingin menghapus paket ini?")) {
            paketData.splice(index, 1);
            renderPaketList();
        }
    };
});

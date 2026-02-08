function simpanCatatan() {
  let judul = document.getElementById("judul").value;
  let isi = document.getElementById("isi").value;

  if (judul === "" || isi === "") {
    alert("Judul dan isi harus diisi!");
    return;
  }

  let catatan = { judul: judul, isi: isi };

  let daftar = JSON.parse(localStorage.getItem("catatan")) || [];
  daftar.push(catatan);
  localStorage.setItem("catatan", JSON.stringify(daftar));

  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";

  tampilkanCatatan();
}

function hapusCatatan(index) {
  let daftar = JSON.parse(localStorage.getItem("catatan")) || [];
  daftar.splice(index, 1);
  localStorage.setItem("catatan", JSON.stringify(daftar));
  tampilkanCatatan();
}

function tampilkanCatatan() {
  let daftar = JSON.parse(localStorage.getItem("catatan")) || [];
  let list = document.getElementById("daftarCatatan");
  list.innerHTML = "";

  daftar.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${item.judul}</strong></span>
      <button class="hapus" onclick="hapusCatatan(${index})">🗑️ Hapus</button>
    `;
    list.appendChild(li);
  });
}

tampilkanCatatan();
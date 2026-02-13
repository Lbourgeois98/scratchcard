if (localStorage.getItem("scratched")) {
  document.body.innerHTML = `
    <div style="color:gold;text-align:center;padding:40px">
      💔 This scratch card has already been used.
    </div>`;
}

function unlock() {
  localStorage.setItem("scratched", "true");
  document.getElementById("nameModal").style.display = "block";
}

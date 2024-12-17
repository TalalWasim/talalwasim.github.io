function showBibtex(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = "block";
  }
}

function closeBibtex(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = "none";
  }
}

window.onclick = function(event) {
  const popups = document.getElementsByClassName("bibtex-popup");
  for (let i = 0; i < popups.length; i++) {
    if (event.target === popups[i]) {
      popups[i].style.display = "none";
    }
  }
};
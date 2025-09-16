const SetCardsBackgroundColor = (activeClassName) => {
  const cards = document.querySelectorAll("#card_meta");
  for (const el of cards) {
    el.style.background = "white";
  }
  document.querySelector(".card_meta_" + activeClassName).style.background =
    "#F5EEF8";
};

export default SetCardsBackgroundColor;

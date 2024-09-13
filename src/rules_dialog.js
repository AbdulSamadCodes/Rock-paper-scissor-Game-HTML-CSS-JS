function handleRulesDialog() {
  const rulesDialog = document.querySelector("[data-rules-dialog]");
  const rulesBtn = document.querySelector("[data-rules-btn]");
  const rulesDialogCloseBtn = document.querySelector("[data-dialog-close-btn]");

  rulesBtn.addEventListener("click", () =>  rulesDialog.show());
  rulesDialogCloseBtn.addEventListener("click", () => rulesDialog.close());
}

handleRulesDialog();
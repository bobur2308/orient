/**
 * Author:
 */
(function () {
  "use strict";
  const tokenTg = "6514117221:AAHTyUTKL0hG7ZAekHFoJXPBFUBCqueQccM";
  const chat_id = "59786876";
  const formMessage = document.querySelector(".php-email-form");
  const nameValue = document.querySelector("#name");
  const emailValue = document.querySelector("#email");
  const textValue = document.querySelector("#subject");
  const messageTxt = document.querySelector("#message");
  const toastLive = document.getElementById("liveToast");
  const toastBody = document.querySelector(".toast-body");
  const imageCheck = document.querySelector(".image-check");
  const statusSms = document.querySelector(".status-sms");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
  formMessage.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      nameValue.value.length ||
      emailValue.value.length ||
      textValue.value.length ||
      messageTxt.value.length
    ) {
      sendTelegram(
        nameValue.value,
        emailValue.value,
        textValue.value,
        messageTxt.value
      );
    }
  });
  function sendTelegram(name, email, text, messageSms) {
    const message = `Sizga yangi xabar bor "${name}" dan pochtasi "${email}"  mavzusi "${text} matni ${messageSms}"`;
    const url = `https://api.telegram.org/bot${tokenTg}/sendMessage?chat_id=${chat_id}&text=${message}`;
    fetch(url)
      .then((res) => {
        if (res.status === 200) {
          imageCheck.setAttribute("src", "./assets/img/check.png");
          toastBody.textContent = "Message Send Success";
          statusSms.textContent = "Success";
          toastBootstrap.show();
          nameValue.value = "";
          emailValue.value = "";
          textValue.value = "";
          messageTxt.value = "";
        }
      })
      .catch((error) => {
        statusSms.textContent = "Error";
        toastBody.textContent = error.message || "something went wrong";
        toastBootstrap.show();
        imageCheck.setAttribute("src", "./assets/img/errorIcon.png");
      });
  }
})();
import { user } from "../api/data";

export function submitForm(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username.length === 0) {
        reject(new Error("Input tidak boleh kosong"));
      }
      let inputFalse = username !== user.name && password !== user.password;
      if (inputFalse) {
        reject(new Error("Input salah, coba lagi!!!"));
        user.status = "logout";
      } else {
        user.status = "login";
        resolve();
      }
    }, 1500);
  });
}

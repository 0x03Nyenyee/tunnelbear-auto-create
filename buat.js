// tunnelbear_manual_signup.js
// Rewritten by ChatGPT for "nyenye" ❤

const fs = require('fs');
const readlineSync = require('readline-sync');
const axios = require('axios');
const colors = require('@colors/colors');

async function validateMail(email) {
  try {
    const response = await axios.post(
      'https://prod-api-core.tunnelbear.com/core/web/validateEmail',
      new URLSearchParams({ email }),
      {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'origin': 'https://www.tunnelbear.com',
          'referer': 'https://www.tunnelbear.com/',
          'tb-csrf-token': '56457b7e108c659b3e5ba2bce884f45a784673d7',
          'tunnelbear-app-id': 'com.tunnelbear.web',
          'tunnelbear-app-version': '1.0.0',
          'tunnelbear-platform': 'Chrome',
          'tunnelbear-platform-version': '134',
          'user-agent': 'Mozilla/5.0'
        }
      }
    );
    return response.data;
  } catch (err) {
    return null;
  }
}

async function registMail(email) {
  try {
    const response = await axios.post(
      'https://prod-api-core.tunnelbear.com/core/web/createAccount',
      new URLSearchParams({
        email,
        password: 'saya123@',
        json: '1',
        v: 'web-1.0',
        referralKey: '',
        tbaa_utm_source: 'website'
      }),
      {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'origin': 'https://www.tunnelbear.com',
          'referer': 'https://www.tunnelbear.com/',
          'tb-csrf-token': '56457b7e108c659b3e5ba2bce884f45a784673d7',
          'tunnelbear-app-id': 'com.tunnelbear.web',
          'tunnelbear-app-version': '1.0.0',
          'tunnelbear-platform': 'Chrome',
          'tunnelbear-platform-version': '134',
          'user-agent': 'Mozilla/5.0'
        }
      }
    );
    return response.data;
  } catch (err) {
    return null;
  }
}

(async () => {
  console.log(colors.cyan('\n[ TunnelBear Auto SignUp by nyenye ]'));
  const email = readlineSync.question(colors.yellow('[?] Masukkan Email kamu: '));

  console.log(colors.blue(`[i] Validasi Email: ${email}`));
  const valid = await validateMail(email);

  if (!valid || !valid.is_valid) {
    console.log(colors.red('[!] Email tidak valid atau sudah digunakan.'));
    return;
  }

  console.log(colors.green('[+] Email valid, lanjut proses pendaftaran...'));
  const regist = await registMail(email);

  if (regist && regist.status === 'OK') {
    console.log(colors.green('[+] Berhasil mendaftar! Silakan verifikasi email kamu secara manual.'));
    fs.appendFileSync('result.txt', `${email}|saya123@\n`);
    console.log(colors.cyan('[+] Data tersimpan di result.txt'));
  } else {
    console.log(colors.red('[!] Gagal mendaftar. Coba lagi nanti.'));
  }
})();

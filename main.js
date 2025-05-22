const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copy');
const generateBtn = document.getElementById('generate');
const toggleBtn = document.getElementById('toggle');
const strengthBar = document.getElementById('strength-bar');
const toggleMode = document.getElementById('toggle-mode');

let isPasswordVisible = false;

function generatePassword() {
  const length = document.getElementById('length').value;
  const hasUpper = document.getElementById('uppercase').checked;
  const hasLower = document.getElementById('lowercase').checked;
  const hasNumber = document.getElementById('numbers').checked;
  const hasSymbol = document.getElementById('symbols').checked;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (hasUpper) chars += upper;
  if (hasLower) chars += lower;
  if (hasNumber) chars += numbers;
  if (hasSymbol) chars += symbols;

  if (chars === "") {
    passwordInput.value = "Selecione ao menos 1 opção";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  passwordInput.value = password;
  evaluateStrength(password);
}

function evaluateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  let percent = (strength / 5) * 100;
  strengthBar.style.width = percent + "%";

  if (percent < 40) strengthBar.style.background = "red";
  else if (percent < 70) strengthBar.style.background = "orange";
  else strengthBar.style.background = "green";
}

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
  passwordInput.select();
  document.execCommand('copy');
  alert('Senha copiada!');
});

toggleBtn.addEventListener('click', () => {
  isPasswordVisible = !isPasswordVisible;
  passwordInput.type = isPasswordVisible ? 'text' : 'password';
});

toggleMode.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});


/* ===== forms.js — единый рабочий скрипт для формы «Сотрудничество» ===== */

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- DOM ссылки ---------- */
    const collabForm      = document.getElementById('collabForm');
    const generalError    = document.getElementById('general-error');
  
    const nameInput       = document.getElementById('name');
    const phoneInput      = document.getElementById('phone');
    const emailInput      = document.getElementById('email');
    const companyInput    = document.getElementById('company');
    const messageInput    = document.getElementById('message');
  
    const fileInput       = document.getElementById('fileInput');   // <input type="file">
    const fileListDisplay = document.getElementById('fileList');    // div для показа файла
  
    const charCounter     = document.getElementById('chars-left-counter');
    const submitButton    = collabForm.querySelector('.black-btn[type="submit"]');
    const uploadButton    = collabForm.querySelector('.file-upload-button');
  
    /* ---------- константы ---------- */
    const MAX_WORDS        = 160;
    const MAX_FILE_SIZE_MB = 10;
    const ALLOWED_TYPES    = ['doc', 'docx', 'pdf'];
  
    /* ======= 1. Работа с файлом ======= */
    fileInput.addEventListener('change', () => {
      clearFileDisplay();
  
      const file = fileInput.files[0];
      if (!file) return;
  
      const err = validateFile(file);
      if (err) {
        showError(null, 'file-error', err);
        fileInput.classList.add('is-invalid');
        fileInput.value = '';          // сброс
        return;
      }
  
      /* отображаем имя и «крестик» */
      const sizeKB = (file.size / 1024).toFixed(1);
      fileListDisplay.innerHTML = `
        <span>${file.name} (${sizeKB} Кб)</span>
        <button type="button"
                class="remove-file-button"
                aria-label="Удалить файл">&times;</button>`;
      fileListDisplay.style.display = 'flex';
  
      fileListDisplay.querySelector('.remove-file-button')
                     .addEventListener('click', removeFile);
    });
  
    function removeFile () {
      fileInput.value = '';
      clearFileDisplay();
    }
  
    function clearFileDisplay () {
      fileListDisplay.innerHTML = '';
      fileListDisplay.style.display = 'none';
      fileListDisplay.classList.remove('is-invalid');
      document.getElementById('file-error').textContent = '';
      document.getElementById('file-error').style.display = 'none';
    }
  
    function validateFile (file) {
      const sizeMB = file.size / 1024 / 1024;
      const ext    = file.name.split('.').pop().toLowerCase();
      if (sizeMB > MAX_FILE_SIZE_MB)
        return `Файл слишком большой (${sizeMB.toFixed(1)} МБ). Макс. ${MAX_FILE_SIZE_MB} МБ.`;
      if (!ALLOWED_TYPES.includes(ext))
        return `Недопустимый тип файла. Разрешены: ${ALLOWED_TYPES.join(', ')}.`;
      return null;
    }
  
    /* ======= 2. Счётчик слов ======= */
    messageInput.addEventListener('input', updateWordCount);
    updateWordCount();         // первичное значение
  
    function updateWordCount () {
      const words = messageInput.value.trim() === ''
                  ? 0
                  : messageInput.value.trim().split(/\s+/).length;
      const left  = MAX_WORDS - words;
      charCounter.textContent = `Осталось ${left >= 0 ? left : 0} слов`;
      charCounter.style.color = left < 0 ? '#dc3545' : '#6c757d';
      /* снимаем маркировку ошибки при вводе */
      messageInput.classList.remove('is-invalid');
      document.getElementById('message-error').style.display = 'none';
    }
  
    /* ======= 3. Отправка формы ======= */
    collabForm.addEventListener('submit', e => {
      e.preventDefault();
      resetErrors();
  
      if (!validateForm()) {
        generalError.textContent = 'Пожалуйста, исправьте ошибки в форме.';
        generalError.style.display = 'block';
        scrollToFirstError();
        return;
      }
  
      /* имитация запроса на сервер */
      disableForm();                                         // блокируем форму
      setTimeout(() => {
        // здесь можно обрабатывать ответ сервера
        // enableForm('Текст ошибки...')  ← если захотите разблокировать
        console.log('Form data would be sent to server here.');
      }, 1200);
    });
  
    /* ======= 4. Валидация ======= */
    function validateForm () {
      let ok = true;
      if (!validateRequired(nameInput,    'name-error'))    ok = false;
      if (!validateRequired(phoneInput,   'phone-error'))   ok = false;
      if (!validateRequired(emailInput,   'email-error'))   ok = false;
      if (!validateRequired(companyInput, 'company-error')) ok = false;
  
      if (emailInput.value.trim() && !validateEmail(emailInput, 'email-error'))
        ok = false;
  
      const words = messageInput.value.trim() === ''
                  ? 0
                  : messageInput.value.trim().split(/\s+/).length;
      if (words > MAX_WORDS) {
        showError(messageInput, 'message-error',
                  `Превышен лимит слов (макс. ${MAX_WORDS}).`);
        ok = false;
      }
  
      const file = fileInput.files[0];
      if (file) {
        const err = validateFile(file);
        if (err) {
          showError(null, 'file-error', err);
          fileListDisplay.classList.add('is-invalid');
          ok = false;
        }
      }
  
      /* здесь можно добавить проверку reCAPTCHA */
  
      return ok;
    }
  
    function validateRequired (input, errId) {
      if (input.value.trim() === '') {
        showError(input, errId, 'Это поле обязательно');
        return false;
      }
      return true;
    }
  
    function validateEmail (input, errId) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(input.value.trim())) {
        showError(input, errId, 'Введите корректный E‑mail');
        return false;
      }
      return true;
    }
  
    /* ======= 5. Визуальные ошибки / очистка ======= */
    function showError (el, errId, msg) {
      const span = document.getElementById(errId);
      if (span) { span.textContent = msg; span.style.display = 'block'; }
      if (el)    el.classList.add('is-invalid');
    }
  
    function resetErrors () {
      generalError.style.display = 'none';
      collabForm.querySelectorAll('.error-message').forEach(s => {
        s.textContent = ''; s.style.display = 'none';
      });
      collabForm.querySelectorAll('.is-invalid')
                .forEach(el => el.classList.remove('is-invalid'));
      updateWordCount();
    }
  
    function scrollToFirstError () {
      const first = collabForm.querySelector('.is-invalid');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  
    /* ======= 6. Блокировка формы (успешная отправка) ======= */
    function disableForm () {
      submitButton.textContent = 'Отправлено';
      submitButton.disabled    = true;
      submitButton.style.backgroundColor = '#6c757d';
      submitButton.style.cursor = 'not-allowed';
  
      Array.from(collabForm.elements).forEach(el => {
        if (el.type !== 'submit' && el.type !== 'button') {
          el.disabled = true;
          el.style.backgroundColor = '#e9ecef';
          el.style.cursor          = 'not-allowed';
        }
      });
  
      /* делаем remove‑file кнопку неактивной */
      const removeBtn = fileListDisplay.querySelector('.remove-file-button');
      if (removeBtn) {
        removeBtn.disabled = true;
        removeBtn.style.cursor = 'not-allowed';
        removeBtn.style.opacity = '0.5';
      }
      if (uploadButton) {
        uploadButton.disabled = true;
        uploadButton.style.opacity = '0.65';
        uploadButton.style.cursor  = 'not-allowed';
      }
    }
  
    /* optional разблокировка, если сервер вернул ошибку */
    function enableForm (errText = '') {
      submitButton.textContent = 'Отправить';
      submitButton.disabled    = false;
      submitButton.style.backgroundColor = '#1a1a1a';
      submitButton.style.cursor = 'pointer';
  
      Array.from(collabForm.elements).forEach(el => {
        el.disabled = false;
        el.style.backgroundColor = '';
        el.style.cursor          = '';
      });
  
      if (uploadButton) {
        uploadButton.disabled = false;
        uploadButton.style.opacity = '1';
        uploadButton.style.cursor  = 'pointer';
      }
  
      generalError.textContent = errText;
      generalError.style.display = errText ? 'block' : 'none';
    }
  });
  
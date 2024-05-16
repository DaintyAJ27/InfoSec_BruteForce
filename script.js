const dropArea = document.getElementById('drop-area');
    const passwordResult = document.getElementById('password-result');
    const loading = document.getElementById('loading');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
        dropArea.style.display = 'none';
    }

    function handleFiles(files) {
        passwordResult.innerHTML = '';
        const file = files[0];
        readEncryptedPassword(file);
    }

    function readEncryptedPassword(file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const encryptedPassword = event.target.result.trim();
            bruteForceAttack(encryptedPassword);
        };

        reader.readAsText(file);
    }

    function bruteForceAttack(encryptedPassword) {
        showLoading();

        const passwordListFile = 'rockyou.txt'; // Path to the rockyou.txt file
        fetch(passwordListFile)
            .then(response => response.text())
            .then(passwordList => {
                const passwords = passwordList.split('\n');
                let found = false;
                let i = 0;
                const interval = setInterval(() => {
                    const password = passwords[i].trim();
                    if (encrypt(password) === encryptedPassword) {
                        clearInterval(interval);
                        hideLoading();
                        displayResult(password);
                        found = true;
                    }
                    i++;
                    if (i >= passwords.length || found) {
                        clearInterval(interval);
                        if (!found) {
                            hideLoading();
                            displayResult("Password not found in the list.");
                        }
                    }
                }, 10);
            })
            .catch(error => {
                hideLoading();
                console.error('Error reading password list:', error);
            });
    }

    function showLoading() {
        loading.style.display = 'block';
    }

    function hideLoading() {
        loading.style.display = 'none';
    }



    function displayResult(result) {
        const listItem = document.createElement('li');
        listItem.textContent = result;
        passwordResult.appendChild(listItem);
    }

    // Allow file selection by clicking
    const fileElem = document.getElementById('fileElem');
    dropArea.addEventListener('click', () => {
        fileElem.click();
    });

    fileElem.addEventListener('change', handleFilesFromInput, false);

    function handleFilesFromInput() {
        const files = this.files;
        handleFiles(files);
    }

    function accessEncryptedPage() {
        window.location.href = 'encrypt/enc.html';
    }
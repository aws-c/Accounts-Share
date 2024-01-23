document.addEventListener('DOMContentLoaded', function() {
    var encryptedData = window.location.hash.substring(1); // Get data from URL
    var decryptedData = JSON.parse(atob(encryptedData)); // Decrypt data
    var pageTitle = decryptedData.pageTitle;
    var accounts = decryptedData.accounts;

    document.querySelector('.container h1').textContent = pageTitle; // Set page title

    var decryptedAccountsContainer = document.getElementById('decrypted-accounts-container');

    accounts.forEach(account => {
        var accountDiv = document.createElement('div');
        accountDiv.className = 'account-box';

        accountDiv.innerHTML = `
            <h3>${account.title}</h3>
            <div class="input-group">
                <label>Username:</label>
                <div class="input-copy-group">
                    <input type="text" value="${account.username}" id="username-${account.title.replace(/\s+/g, '-')}" disabled>
                    <button class="copy-btn" onclick="copyToClipboard('username-${account.title.replace(/\s+/g, '-')}')">Copy</button>
                </div>
            </div>
            <div class="input-group">
                <label>Password:</label>
                <div class="input-copy-group">
                    <input type="text" value="${account.password}" id="password-${account.title.replace(/\s+/g, '-')}" disabled>
                    <button class="copy-btn" onclick="copyToClipboard('password-${account.title.replace(/\s+/g, '-')}')">Copy</button>
                </div>
            </div>
        `;

        decryptedAccountsContainer.appendChild(accountDiv);
    });
});


alert('Error in copying text: ' + err);

function copyToClipboard(elementId) {
    var copyText = document.getElementById(elementId);
    copyText.disabled = false; // Temporarily enable the input field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    copyText.disabled = true; // Disable the input field again
    alert("Copied to clipboard"); // Optional: Display some feedback
}



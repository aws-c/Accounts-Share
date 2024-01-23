document.addEventListener('DOMContentLoaded', function() {
    addAccount(); // Add the initial account box
});

function addAccount() {
    var accountContainer = document.getElementById('accountContainer');
    var accountCount = accountContainer.children.length + 1;

    var accountBox = document.createElement('div');
    accountBox.className = 'account-box';

    var defaultTitle = "Account " + accountCount;

    accountBox.innerHTML = `
        <div class="input-group">
            <label>Title:</label>
            <input type="text" class="title" placeholder="${defaultTitle}">
        </div>
        <div class="input-group">
            <label>Username:</label>
            <input type="text" class="username" placeholder="Username">
        </div>
        <div class="input-group">
            <label>Password:</label>
            <input type="password" class="password" placeholder="Password">
        </div>
    `;

    accountContainer.appendChild(accountBox);
}

function shareAccounts() {
    var accounts = [];
    var pageTitleInput = document.getElementById('pageTitle').value.trim();
    var pageTitle = pageTitleInput ? (pageTitleInput.toLowerCase().endsWith("accounts") ? pageTitleInput : pageTitleInput + " Accounts") : "Your Accounts";
    var titles = document.querySelectorAll('.title');
    var usernames = document.querySelectorAll('.username');
    var passwords = document.querySelectorAll('.password');

    for (var i = 0; i < titles.length; i++) {
        if (usernames[i].value.trim() !== "" && passwords[i].value.trim() !== "") {
            var title = titles[i].value || titles[i].placeholder;
            accounts.push({
                title: title,
                username: usernames[i].value,
                password: passwords[i].value
            });
        }
    }

    var dataToEncrypt = { pageTitle: pageTitle, accounts: accounts };

    if(accounts.length > 0){
        var encrypted = btoa(JSON.stringify(dataToEncrypt));
        var shareLink = window.location.href.replace('index.html', '') + 'get#' + encrypted;
        var outputBox = document.getElementById('outputBox');
        outputBox.textContent = shareLink;
    } else {
        alert("No accounts with both username and password were found.");
    }
}


function copyToClipboard() {
    var outputBox = document.getElementById('outputBox');
    navigator.clipboard.writeText(outputBox.textContent).then(function() {
        alert('Copied to clipboard!');
    }, function(err) {
        alert('Error in copying text: ', err);
    });
}

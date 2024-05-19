function generateEmail() {
    // Simple function to generate a random email address
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let email = '';
    for (let i = 0; i < 10; i++) {
        email += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    email += '@handykiller.com';
    document.getElementById('email').innerText = email;
}

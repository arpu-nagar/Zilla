const signUpTemplate = (name, link) => {
    return `
        <html>
            <body> 
            <h6> Hi ${name}, <h6>
            <br>
            <p> Please click on the following link to verify your account.</p>
            <br>
            <a href=${link}>${link}</a>
            </body> 
        </html> 
    `;
};

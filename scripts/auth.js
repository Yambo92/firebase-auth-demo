


//listen for auth status change
auth.onAuthStateChanged(user => {
    if (user) {
        //获取database data
        db.collection('guides').get().then((spanshot) => {
            setupGuides(spanshot.docs);
            setupUI(user);
        })
    } else {
        setupUI();
        setupGuides([])
    }
    
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
     e.preventDefault();

     //get user info
     const email = signupForm['signup-email'].value;
     const password = signupForm['signup-password'].value;

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        })
        .catch(error => console.log(error));
});

//logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
        .then(() => {
            console.log('登出成功！');
            
        })
});

//sign in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            // console.log(cred.user);

            //关闭模态框并reset Form
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
            
        })
        .catch(error => console.log(error))
})



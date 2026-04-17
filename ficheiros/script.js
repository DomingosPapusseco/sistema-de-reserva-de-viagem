async function handleAuth(e) {
    e.preventDefault();

    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    const isSignup = document.getElementById('modal-title').innerText.includes("Criar");

    // 🔐 ADMIN (mantém igual)
    if (email === 'admin@angoreserva.com' && password === 'admin123') {
        sessionStorage.setItem('adminSession', Date.now());
        window.location.href = 'admin.html';
        return;
    }

    if (isSignup) {
        // 🔥 CADASTRAR NO FIREBASE
        const userId = Date.now();

        await set(ref(db, 'usuarios/' + userId), {
            id: userId,
            nome: email.split('@')[0],
            email: email,
            password: password,
            data: new Date().toLocaleDateString('pt-AO'),
            status: 'ativo'
        });

        alert("Conta criada com sucesso!");
    } else {
        // 🔥 LOGIN (buscar no Firebase)
        const snapshot = await get(child(ref(db), 'usuarios'));

        if (!snapshot.exists()) {
            alert("Nenhum usuário cadastrado!");
            return;
        }

        const users = snapshot.val();
        let foundUser = null;

        Object.values(users).forEach(user => {
            if (user.email === email && user.password === password) {
                foundUser = user;
            }
        });

        if (!foundUser) {
            alert("Email ou palavra-passe incorretos!");
            return;
        }

        sessionStorage.setItem('loggedUser', JSON.stringify(foundUser));
        state.isLoggedIn = true;

        document.getElementById('auth-section').innerHTML =
            `<span style="color: white; font-weight: 700;">Olá, ${foundUser.nome}</span>`;
    }

    toggleModal(false);
}

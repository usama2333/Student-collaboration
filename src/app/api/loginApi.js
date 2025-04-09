import axios from "axios";

export default async function loginApi(
    data,
    authCtx,
    router,
    toast,
    setTimeout
) {
    try {
        const response = await axios({
            method: "post",
            url: "http://localhost:3000/api/auth/login",
            data: {
                email: data.email,
                password: data.password,
            },
        });

        if (response.status === 200 || response.status === 201) {
            console.log(response, "login response.......");
            console.log(response.data.token, "token..............");
           
            toast.success("Signup successful!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);

            authCtx.login(
                response.data.token,
            );
           
        }
    } catch (error) {
        console.log(error.message);

        notify(error.message);
    }
}

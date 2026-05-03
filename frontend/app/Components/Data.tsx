
let Data = {
    registr:
    [
        {
            id: "1",
            type: "text",
            name: "Username",
            src : "/png/iconUsers.png",
            value: "",
            bol: true,
        },
        {
            id: "2",
            type: "email",
            name: "Email",
            src : "/png/iconEmail.png",
            value: "",
            bol: true,
        },
        {
            id: "3",
            type: "password",
            name: "Password",
            src : "/png/iconSecret.png",
            value: "",
            bol: true,
        },
        {
            id: '4',
            type: "password",
            name: "ConfirmPassword",
            src : "/png/iconSecret.png",
            value: "",
            bol: true,
        }
    ],
    login:
    [
        {
            id: "1",
            type: "email",
            name: "Email",
            src : "/png/iconEmail.png",
            value: "",
            bol: true,
        },
        {
            id: "2",
            type: "password",
            name: "Password",
            src : "/png/iconSecret.png",
            value: "",
            bol: true,
        }
    ],
    reset:
    [
        {
            id: "1",
            type: "email",
            name: "Email",
            src : "/png/iconEmail.png",
            value: "",
            bol: true,
        },
         {
            id: "2",
            type: "password",
            name: "Password",
            src : "/png/iconSecret.png",
            value: "",
            bol: true,
        },
        {
            id: '3',
            type: "password",
            name: "ConfirmPassword",
            src : "/png/iconSecret.png",
            value: "",
            bol: true,
        }

        
    ],
    formStyle: 
    {
        inputDiv: "flex justify-between border-b-black border-b-2 max-5 my-7 py-1 m-4",
        inputs: " bg-transparent outline-none placeholder-black text-3xl placeholder:text-xl",
        imgDiv: " flex items-center justify-center",
        btn_submit:  "border border-blue-300 rounded-2xl cursor-pointer text-center text-lg font-bold hover:bg-blue-400 transition-all duration-600 hover:text-blue-100 hover:border-gray-800 p-3 w-2/2 ",
        btn_sin_log: "border border-blue-300 rounded-2xl cursor-pointer text-center text-lg font-bold hover:bg-blue-400 transition-all duration-600 hover:text-blue-100 hover:border-gray-800 text-center p-3 py-1 ml-1"
    },
}

export default Data;
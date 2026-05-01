let Data  = function () {
    return  {
        fromStyles: 
        {
            inputDiv: "flex justify-between border-b-black border-b-2 max-5 my-7 py-1 m-4",
            inputs: "w-11/12 bg-transparent outline-none placeholder-black text-3xl placeholder:text-xl",
            imgDiv: "w-2/12 flex items-center justify-center",
            btn_submit: "border border-blue-300  cursor-pointer w-2/2 text-center text-lg p-3 rounded-2xl font-bold hover:bg-blue-400 transition-all hover:text-blue-100 hover:border-gray-800"
        },
        struct: [
                    {
                        type: "text",
                        name: "Username",
                        src : "/png/iconUsers.png",
                        value: "",
                        bol: true,
                    },
                    {
                        type: "email",
                        name: "Email",
                        src : "/png/iconEmail.png",
                        value: "",
                        bol: true,
                    },
                    {
                        type: "password",
                        name: "Password",
                        src : "/png/iconSecret.png",
                        value: "",
                        bol: true,
                    }
                ],
    }
}

export default Data;
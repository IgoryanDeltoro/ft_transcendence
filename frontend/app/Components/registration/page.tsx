"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Fanwood_Text, Island_Moments } from "next/font/google";
import { error } from "console";

let data = {
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
	fromStyles: 
        {
            inputDiv: "flex justify-between border-b-black border-b-2 max-5 my-7 py-1 m-4",
            inputs: " bg-transparent outline-none placeholder-black text-3xl placeholder:text-xl",
            imgDiv: " flex items-center justify-center",
            btn_submit:  "border border-blue-300 rounded-2xl cursor-pointer text-center text-lg font-bold hover:bg-blue-400 transition-all duration-600 hover:text-blue-100 hover:border-gray-800 p-3 w-2/2 ",
			btn_sin_log: "border border-blue-300 rounded-2xl cursor-pointer text-center text-lg font-bold hover:bg-blue-400 transition-all duration-600 hover:text-blue-100 hover:border-gray-800 text-center p-3 py-1"
        },
       
}
function Registration() {

	const [isLoginMode, setIsLoginMod] = useState(true);
	const [labelFocus, setLabelFocus] = useState(data.struct);
	const router = useRouter();

	useEffect(() => { router.refresh(); }, [router])
	
	useEffect(() => {
		if (isLoginMode && labelFocus.length === 4)
		{
			setLabelFocus([...labelFocus.slice(0, -1)])
		}
		else if (!isLoginMode && labelFocus.length < 4)
		{
			setLabelFocus((prev) => [...prev, {
                        type: "password",
                        name: "ConfirmPassword",
                        src : "/png/iconSecret.png",
                        value: "",
                        bol: true,
                    }]);
		}
	}, [isLoginMode]);

return (

	<div  className="bg w-full h-screen flex items-center justify-center" >

		<div className="w-full max-w-md mx-auto p-6 glass rounded-2xl">

			<div className="w-full text-center my-3">
				<h2 className="text-4xl font-bold">
					{isLoginMode ? "Login" : "Sign Up" }
				</h2>
			</div>
			
			<form onSubmit={ async (e) => { 
				e.preventDefault();
				const form = e.currentTarget;
				if (!isLoginMode && form.password != form.confirmPassword)
				{
					alert("Passwords do not match");
					setLabelFocus((prev) => (
						prev.map((item) => {
							if (item.type === "password")
								return {...item, value: ""}
							else
								return item
						})
					));
					return ;
				}
				await fetch(isLoginMode ? "http://localhost:4000/user/login" : "http://localhost:4000/user/register", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(isLoginMode ? {
						email: form.email.value,
						password: form.password.value
					} : {
						email: form.email.value,
						password: form.password.value,
						name: form.text.value,
						role: "PLAYER"
					})
				})
				.then((res) => console.log(res))
				.catch((error) => console.log(error))

			}}>
				{labelFocus.map((item, i) => {
					if (isLoginMode && i === 0)
							return ;
					return (
						<div className={data.fromStyles.inputDiv} key={i}>
							
							<label htmlFor={item.name} className="cursor-pointer">
								<input required placeholder={item.bol ? item.name : ""}
									type={item.type} name={item.type} id={String(i)} value={item.value} className={data.fromStyles.inputs}
									onFocus={(e) => { setLabelFocus((prev) => prev.map((item, i) => i === Number(e.target.id) ? {...item, bol: false} : item)); }}
									onChange={(e) => { setLabelFocus((prev) => prev.map((item, i) => i ===  Number(e.target.id) ? {...item, value: e.target.value} : item)); }}
									onBlur={(e) => { setLabelFocus((prev) => prev.map((item, i) => i ===  Number(e.target.id) ? {...item, bol: true} : item)); }}
								/>
							</label>
							<div className={data.fromStyles.imgDiv}>
								<img src={`${item.src}`} alt="icon" className="w-15  min-w-8"/>
							</div>
						</div>
					)
				})}
				
				<div className="m-5 text-center">
					<div>
						<button className={data.fromStyles.btn_submit} type="submit" > 
							{isLoginMode ? "Login" : "Sign Up"}
						</button>
					</div>
					<div className="p-4 text-lg font-bold flex justify-between">
						<p>
							{!isLoginMode ? "Already have an account ? / " : "Don't have an account ? / " }
							<button  className={data.fromStyles.btn_sin_log}
								type="button" onClick={() => { 
								setIsLoginMod(!isLoginMode); 
								setLabelFocus((prev) => prev.map((item) => ({...item, value: "", bol: true})));
								}} >
								{!isLoginMode ? " Login" : " Sign Up"}
							</button>
						</p>
					</div>
				</div>
			</form>
		</div>
	</div>
)}

export default Registration

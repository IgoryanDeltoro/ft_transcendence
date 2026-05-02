"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

let data = [
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
                    }
            ];
let fromStyles = 
{
	inputDiv: "flex justify-between border-b-black border-b-2 max-5 my-7 py-1 m-4",
	inputs: " bg-transparent outline-none placeholder-black text-3xl placeholder:text-xl",
	imgDiv: " flex items-center justify-center",
	btn_submit:  "border border-blue-300 rounded-2xl cursor-pointer text-center text-lg font-bold hover:bg-blue-400 transition-all duration-600 hover:text-blue-100 hover:border-gray-800 p-3 w-2/2 ",
	btn_sin_log: "border border-blue-300 rounded-2xl cursor-pointer text-center text-lg font-bold hover:bg-blue-400 transition-all duration-600 hover:text-blue-100 hover:border-gray-800 text-center p-3 py-1"
}

function Registration() {


	const rout = useRouter();
	const [isLoginMode, setIsLoginMod] = useState(true);
	const [labelFocus, setLabelFocus] = useState(data);
	
	useEffect(() => {
		if (isLoginMode && labelFocus.length === 4)
		{
			setLabelFocus(labelFocus.slice(0,-1));
		}
		else if (!isLoginMode && labelFocus.length < 4)
		{
			setLabelFocus((prev) => [...prev, 
				{
					id: '4',
					type: "password",
					name: "ConfirmPassword",
					src : "/png/iconSecret.png",
					value: "",
					bol: true,
                }]);
		}
	}, [isLoginMode]);

return (

	<div  className="bg w-full h-screen flex min-w-md items-center justify-center" >

		<div className="w-full max-w-md min-w-md mx-auto p-6 glass rounded-2xl">

			<div className="w-full text-center my-3">
				<h2 className="text-4xl font-bold">
					{isLoginMode ? "Login" : "Sign Up" }
				</h2>
			</div>
			
			<form onSubmit={ async (e) => { 
				e.preventDefault();
				const form = e.currentTarget;
				
				if (!isLoginMode && form.Password.value != form.ConfirmPassword.value)
				{
					alert("Passwords do not match");
					return ;
				}
				await fetch(isLoginMode ? "http://localhost:4000/user/login" : "http://localhost:4000/user/register", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(isLoginMode ? {
						email: form.Email.value,
						password: form.Password.value
					} : {
						email: form.Email.value,
						password: form.Password.value,
						name: form.Username.value,
						role: "PLAYER"
					})
				})
				.then((res) => {
					if (res.ok && !isLoginMode)
					{
						setLabelFocus((prev) => prev.map((item) => ({...item, value: "", bol: true})));
						setIsLoginMod(true);
					}
					else if (res.ok && isLoginMode)
						rout.push('/');
					else
					{
						alert("");
					}
				})
			}}>
				{labelFocus.map((item, i) => {
					if (isLoginMode && i === 0)
							return null;
					return (
						<div className={fromStyles.inputDiv} key={i}>
							<label htmlFor={item.name} className="cursor-pointer">
								<input required placeholder={item.bol ? item.name : ""}
									type={item.type} name={item.name} id={item.id} value={item.value} className={fromStyles.inputs}
									onFocus={(e) => { setLabelFocus((prev) => prev.map((item) => item.id === e.target.id ? {...item, bol: false} : item)); }}
									onChange={(e) => { setLabelFocus((prev) => prev.map((item) => item.id === e.target.id ? {...item, value: e.target.value} : item)); }}
									onBlur={(e) => { setLabelFocus((prev) => prev.map((item) => item.id === e.target.id ? {...item, bol: true} : item)); }}
								/>
								
							</label>
							<div className={fromStyles.imgDiv}>
								<img src={`${item.src}`} alt="icon" id={item.id} className="w-15  min-w-8 cursor-pointer"
									onClick={(e) => {
										setLabelFocus((prev) => (
											prev.map((item) => {
												if (item.id === e.target.id && (item.name === "Password" || item.name === "ConfirmPassword"))
												{
													if (item.type === "text")
														return {...item, type: "password", src: "/png/iconSecret.png"}
													else
														return {...item, type: "text", src: "/png/iconEye.png"}
												}
												else
													return item;
											})
										));
									}}
								/>
							</div>
						</div>
					)
				})}
				
				<div className="m-5 text-center">
					<div>
						<button className={fromStyles.btn_submit} type="submit" > 
							{isLoginMode ? "Login" : "Sign Up"}
						</button>
					</div>
					<div className="p-4 text-lg font-bold flex justify-between">
						<p>
							{!isLoginMode ? "Already have an account ? / " : "Don't have an account ? / " }
							<button  className={fromStyles.btn_sin_log}
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

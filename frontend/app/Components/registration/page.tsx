"use client"
import { useEffect, useState } from "react"

function Registration() {

	const fromStyles = 
	{
		inputDiv: "flex justify-between border-b-black border-b-2 max-5 my-7 py-1 m-4",
		inputs: "w-11/12 bg-transparent outline-none placeholder-black text-3xl placeholder:text-xl",
		imgDiv: "w-2/12 flex items-center justify-center",
	};

	const [isLoginMode, setIsLoginMod] = useState(true);
	const [labelFocus, setLabelFocus] = useState([
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
	]);
	
	useEffect(() => {
		if (isLoginMode && labelFocus.length === 4)
		{
			setLabelFocus([...labelFocus.slice(0, -1)])
		}
		else if (!isLoginMode && labelFocus.length < 4)
		{
			setLabelFocus([...labelFocus, 
				{
					type: "password",
					name: "Password",
					src : "/png/iconSecret.png",
					value: "",
					bol: true,
				}
			]);
		}
	}, [isLoginMode]);

return (

	<div  className="bg w-full   h-screen flex items-center justify-center" >

		<div className="w-full max-w-md mx-auto p-6 glass rounded-2xl">

			<div className="w-full text-center my-3">
				<h2 className="text-4xl font-bold">
					{isLoginMode ? "Login" : "Sign Up" }
				</h2>
			</div>
			
			<form action="">
				
				{labelFocus.map((item, i) => {
					if (isLoginMode && i === 0)
							return null;
					return (
						<div className={fromStyles.inputDiv} key={i}>
							
							<label htmlFor={item.name} className="cursor-pointer">
								<input 
									placeholder={item.bol ? item.name : ""}
									type={item.type} name={item.name} id={String(i)} value={item.value} className={fromStyles.inputs}
									onFocus={(e) => {
										const index = Number(e.target.id);
										labelFocus[index].bol = !labelFocus[index].bol;
										setLabelFocus([...labelFocus])
									}}
									onChange={(e) => {
										const index = Number(e.target.id);
										labelFocus[index].value = e.target.value;
										setLabelFocus([...labelFocus])
									}}
									onBlur={(e) => {
										const index = Number(e.target.id);
										labelFocus[index].bol = !labelFocus[index].bol;
										setLabelFocus([...labelFocus])
									}}
								/>
							</label>
							<div className={fromStyles.imgDiv}>
								<img src={`${item.src}`} alt="icon" className="w-15  min-w-8"/>
							</div>
						</div>
					)
				})}
				
				<div className="m-5 text-center">
					<div>
						<button className="border cursor-pointer w-1/2 text-center rounded-2xl font-bold hover:bg-blue-400 transition-all hover:text-blue-200 hover:border-gray-400"
							type="submit" onSubmit={() => {
							labelFocus.forEach((item) => {
								console.log(item.value)
							})
						}}> {isLoginMode ? "Login" : "Sign Up"} </button>
					</div>
					<div className="p-4 text-lg font-bold">
						<p>
							{!isLoginMode ? "Already have an account? / " : "Don't have an account? / " }
							<a 
								onClick={() => {
									setIsLoginMod(!isLoginMode);
									console.log("I should write a login later ");
								}}
								href="#">{!isLoginMode ? " Login" : " Sign Up"}
							</a>
						</p>
					</div>
				</div>
			</form>
		</div>
	</div>
)}

export default Registration

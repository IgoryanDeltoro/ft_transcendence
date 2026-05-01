"use client"
import { useEffect, useState } from "react"

let index = 1;
function clear(array: Item[]) : Item[] {
	return array.map((item) => ({
		...item,
		value: "",
		bol: true,
	}))
}
function Registration() {

	const fromStyles =  {
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

	<div  className="bg w-full h-screen flex items-center justify-center" >

		<div className="w-full max-w-md mx-auto p-6 glass rounded-2xl">

			<div className="w-full text-center my-3">
				<h2 className="text-4xl font-bold">
					{isLoginMode ? "Login" : "Sign Up" }
				</h2>
			</div>
			
			<form action="submit" onSubmit={(e) => {
				e.preventDefault();
				if (isLoginMode && labelFocus[labelFocus.length - 1].value != labelFocus[labelFocus.length - 2].value)
				{
					setLabelFocus(clear(labelFocus));
					return ;
				}
				// setLabelFocus(clear(labelFocus));
			}}>
				{labelFocus.map((item, i) => {
					if (isLoginMode && i === 0)
							return ;
					return (
						<div className={fromStyles.inputDiv} key={i}>
							
							<label htmlFor={item.name} className="cursor-pointer">
								<input required placeholder={item.bol ? item.name : ""}
									type={item.type} name={item.name} id={String(i)} value={item.value} className={fromStyles.inputs}
									onFocus={(e) => { setLabelFocus((prev) => prev.map((item, i) => i === Number(e.target.id) ? {...item, bol: false} : item)); }}
									onChange={(e) => { setLabelFocus((prev) => prev.map((item, i) => i ===  Number(e.target.id) ? {...item, value: e.target.value} : item)); }}
									onBlur={(e) => { setLabelFocus((prev) => prev.map((item, i) => i ===  Number(e.target.id) ? {...item, bol: true} : item)); }}
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
						<button className="border border-blue-300  cursor-pointer w-2/2 text-center text-lg p-3 rounded-2xl font-bold hover:bg-blue-400 transition-all hover:text-blue-100 hover:border-gray-800"
							type="submit" onSubmit={() => {
							labelFocus.forEach((item) => {
								console.log(item.value)
							})
						}}> {isLoginMode ? "Login" : "Sign Up"} </button>
					</div>
					<div className="p-4 text-lg font-bold ">
						<p>
							{!isLoginMode ? "Already have an account? / " : "Don't have an account? / " }
							<button type="button" onClick={() => { setIsLoginMod(!isLoginMode); }} >
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

"use client"
import { useEffect, useState } from "react"
import Data from "./data"

let data = Data();
function Registration() {

	const [isLoginMode, setIsLoginMod] = useState(true);
	const [labelFocus, setLabelFocus] = useState(data.struct);
	
	useEffect(() => {
		if (isLoginMode && labelFocus.length === 4)
		{
			setLabelFocus([...labelFocus.slice(0, -1)])
		}
		else if (!isLoginMode && labelFocus.length < 4)
		{
			setLabelFocus((prev) => [...prev, {
                        type: "password",
                        name: "Password",
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
			
			<form action="submit" onSubmit={(e) => {
				e.preventDefault();
				if (isLoginMode && labelFocus[labelFocus.length - 1].value != labelFocus[labelFocus.length - 2].value)
				{
					setLabelFocus((prev) => prev.map((item) => ({...item, value: "", bol: true})));
					return ;
				}
			}}>
				{labelFocus.map((item, i) => {
					if (isLoginMode && i === 0)
							return ;
					return (
						<div className={data.fromStyles.inputDiv} key={i}>
							
							<label htmlFor={item.name} className="cursor-pointer">
								<input required placeholder={item.bol ? item.name : ""}
									type={item.type} name={item.name} id={String(i)} value={item.value} className={data.fromStyles.inputs}
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
						<button className={data.fromStyles.btn_submit}
							type="submit" onClick={(e) => {
							e.preventDefault();
							labelFocus.forEach((item) => {
								console.log(item.value);
							})
							setLabelFocus((prev) => prev.map((item) => ({...item, value: "", bol: true})));
							
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

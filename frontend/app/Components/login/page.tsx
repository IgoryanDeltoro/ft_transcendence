"use client"
import { useRouter } from "next/navigation";
import { useState, useRef} from "react"
import Data from "../Data";

function Registration() {

	const audioRef = useRef(null);
	const rout = useRouter();
	const [loginData, setLoginData] = useState(Data.login);

return (

	<div  className="bg w-full h-screen flex min-w-md items-center justify-center" >

		<div className="fixed top-10 left-0.5">
			<div className="">
				<button className="cursor-pointer" type="button" onClick={(e) => rout.push("/")}>
					<img src="/png/home.png" alt="home" className="w-16  transition-transform duration-300 hover:scale-105"/>
				</button>
			</div>
			<div className="">
				<button className="cursor-pointer" type="button" onClick={(e) => console.log("He !")}>
					<img src="/png/iconSettings.png" alt="home"  className="w-15  transition-transform duration-300 hover:scale-105"/>
				</button>
			</div>
		</div>

		<div onClick={(e) => {
			
		}}  className="text-white cursor-pointer">
			Music
			<audio ref={audioRef} src="/audio/gameMusic.mp3"></audio>
		</div>

		<div className="w-full max-w-md min-w-md mx-auto p-6 glass rounded-2xl">

			<div className="w-full text-center my-3">
				<h2 className="text-4xl font-bold"> Login </h2>
			</div>
			
			<form onSubmit={ async (e) => { 
				e.preventDefault();
				const form = e.currentTarget;
				
				await fetch("http://localhost:4000/user/login", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: form.Email.value,
						password: form.Password.value
					})
				})
				.then((res) => res.ok ? rout.push('/') : alert("Wrong password or Login"))}}>
				{loginData.map((item, i) => {
					return (
						<div className={Data.formStyle.inputDiv} key={i}>
							<label htmlFor={item.name} className="cursor-pointer">
								<input required placeholder={item.bol ? item.name : ""}
									type={item.type} name={item.name} id={item.id} value={item.value} className={Data.formStyle.inputs}
									onFocus={(e) => { setLoginData((prev) => prev.map((item) => item.id === e.target.id ? {...item, bol: false} : item)); }}
									onChange={(e) => { setLoginData((prev) => prev.map((item) => item.id === e.target.id ? {...item, value: e.target.value} : item)); }}
									onBlur={(e) => { setLoginData((prev) => prev.map((item) => item.id === e.target.id ? {...item, bol: true} : item)); }}
								/>
								
							</label>
							<div className={Data.formStyle.imgDiv}>
								<img src={`${item.src}`} alt="icon" id={item.id} className="w-15  min-w-8 cursor-pointer"
									onClick={(e) => {
										setLoginData((prev) => (
											prev.map((item) => {
												if (item.id === e.currentTarget.id && (item.name === "Password" || item.name === "ConfirmPassword"))
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
						<button className={Data.formStyle.btn_submit} type="submit" > 
                            Login
						</button>
					</div>
					<div className="p-4 text-lg font-bold flex justify-between">
						<p>
							Don't have an account ? / 
							<button  className={Data.formStyle.btn_sin_log} type="button" 
								onClick={() => {
									rout.push("/Components/registration");
								}} >
								Sign Up
							</button>
						</p>
					</div>
				</div>

			</form>
			<div className="text-center  ">
				<button onClick={(e) => {
					return rout.push('/Components/reset');
				}}
					type="button" className="hover:border-b hover:border-blue-400 transform-y cursor-pointer">
					Forgot your password 
				</button>
			</div>
		</div>
	</div>
)}

export default Registration

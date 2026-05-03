import Link from "next/link";
const Home = () => {
  return (
    <main className="">
          <h1 className="text-4xl "> Home </h1>
          <h2>hello I am here</h2>
          <Link href={"/Components/Auth/Registr"}>to Register</Link>
          <Link href={"/Components/Auth/Login"}>to Login</Link>
    </main>
  )
  
}

export default Home;
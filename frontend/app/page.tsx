import Link from "next/link";
const Home = () => {
  return (
    <main className="">
          <h1 className="text-4xl "> Home </h1>
          <h2>hello I am here</h2>
          <Link href={"Components/registration"}>to Register</Link>
    </main>
  )
}

export default Home;
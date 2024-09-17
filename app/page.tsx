import Link from "next/link";

export default function Home() {
  return (
    <>
    <p className='mb-3 text-xl'>Welcome to Task Manager</p>
     <Link className='text-blue-800' href='/tasks/new'>click here</Link> to create your list
     </>
  )
}


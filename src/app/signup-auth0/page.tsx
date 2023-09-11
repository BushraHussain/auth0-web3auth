import Link from "next/link";
import Profile from "../profile/page";


export default function SignupAuth0() {
  return (
    <div>
        <div>
            Signup using auth0
        </div>

        <div className="flex justify-between">
            <div className=" bg-red-500 w-48 h-10 flex justify-center items-center">
                <Link href="/api/auth/login" >LOGIN</Link>
            </div>

            <div className=" bg-green-500 w-48 h-10 flex justify-center items-center">
                <Link href="/api/auth/logout" >Logout</Link>
            </div>

            <div><Profile /></div>

        </div>

       
       
        
    </div>
  )
}

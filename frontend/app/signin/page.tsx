import SigninForm from "../components/signinpage/SigninForm"
import ThemeToggle from "../components/themeBtn"
import Link from "next/link"

export default function SignupPage(){
    return (
        <div className="sm:scale-100 scale-70 w-[500px] border border-gray-200 in-dark:border-cyan-200 shadow-gray-400 in-dark:shadow-cyan-950 shadow-[2px_2px_20px] p-10 rounded-2xl absolute top-[50%] left-[50%] -translate-[50%]">
            <ThemeToggle/>
            <h1 className="text-center m-3 font-[300] text-[2em] text-cyan-500 in-dark:text-cyan-200">Sign in</h1>
            <p className="text-center text-gray-500 in-dark:text-gray-300">Sign in to use the app</p>
            <SigninForm/>

            <div className="flex justify-between items-baseline-last text-gray-400 mt-2">
                <p>Do not have an account?</p>
                <Link href={"/signup"} className="hover:text-cyan-500">sign up here</Link>
            </div>
        </div>
    )
}
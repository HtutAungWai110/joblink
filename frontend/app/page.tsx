
import Motion from "./components/Animation";
import SequentialAnimate from "./components/SequentialAnimate";
import LoginBtn from "./components/landingpage/NavigateLogin";
import SignupBtn from "./components/landingpage/NavigateSignup";

const appearRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
}

const appearLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
}

const appearUp ={
  hidden: {opacity: 0, y: 50},
  visible: {opacity: 1, y: 0}
}

export default function Home() {
  return (
    <main>
      <section>
     
        <div className="absolute left-[50%] top-[50%] -translate-[50%] rounded-2xl">
          <SequentialAnimate stagger={0.3}>
            <Motion variants={appearRight} transition={{duration: 0.5}}>
                <h1 className="text-[3em] text-shadow-sm font-[600]">
                  Welcome to <strong className="text-cyan-500">Joblink</strong>
                </h1>
            </Motion>
            <Motion variants={appearRight} transition={{duration: 0.5}}>
                <p className="text-[1.5em] text-gray-500 font-[500] in-dark:text-cyan-200 border-b pb-2">Easily track your job applications</p>

            </Motion>
            <Motion variants={appearUp} transition={{duration: 0.5}}>

              <p className="m-[20px_0px]">
                JobLink is a smart job-application tracker that keeps your job hunt organized. Log applications, track statuses, set reminders for follow-ups, and stay on top of interviews—all in one place. Spend less time managing your search and more time landing your next opportunity.
              </p>
            </Motion>

    
              <div className="flex justify-between">
                <Motion variants={appearRight} className="w-[50%] bg-black text-center text-white p-2 rounded-l-2xl border border-gray-400 shadow-lg in-dark:shadow-[0px_2px_20px] in-dark:shadow-cyan-900">
                    <LoginBtn/>
                </Motion>
    
                

                <Motion variants={appearLeft} className="w-[50%] bg-white text-center text-black p-2 rounded-r-2xl border border-gray-400 shadow-lg in-dark:shadow-[0px_2px_20px] in-dark:shadow-cyan-900">
                  <SignupBtn/>
                </Motion>
        

              </div>
      
          </SequentialAnimate>
          

          

        </div>
      </section>
      
    </main>
    
  );
}

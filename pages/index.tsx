import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      style={{
        height: "90vh",
      }}
      className="flex justify-evenly items-center flex-1 max-w-6xl m-auto"
    >
      <div className="flex justify-start flex-col">
        <h1 className="font-bold text-5xl text-cyan-950 fade-in">AceTutors</h1>
        <p className="mb-10">
          A place to connect with tutors and students for York Univeristy
          courses.
        </p>
        <div className="flex">
          <Link href="/login/student/LoginSignUp">
            <button className="bg-cyan-950 text-white py-2 px-6 rounded">
              I'm a Student
            </button>
          </Link>
          <Link href="/login/teacher/LoginSignUp">
            <button className="bg-cyan-950 ml-2 text-white py-2 px-8 rounded">
              I'm a Tutor
            </button>
          </Link>
        </div>
      </div>


      
      <div>
        <img
          width={300}
          className="w-full max-w-xl"
          src="https://static.vecteezy.com/system/resources/previews/001/019/685/non_2x/private-tutor-pointing-at-board-vector.jpg"
        />
      </div>
    </div>
  );
}

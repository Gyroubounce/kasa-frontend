import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="w-full flex justify-center items-center py-20">
      <div className="w-185.5 h-147.5 bg-white rounded-20 border border-gray-light flex flex-col items-center px-10 pt-18 mt-10 text-center">

        <h1 className="text-[24px] md:text-[32px] font-bold text-main-red">
          Heureux de vous revoir
        </h1>

        <p className="mt-1 text-[14px] text-black font-normal leading-[1.4] max-w-125">
          Connectez-vous pour retrouver vos réservations, vos  <br className="hidden md:block" /> annonces et tout ce qui rend vos séjours uniques.
        </p>

        <LoginForm />

      </div>
    </main>
  );
}

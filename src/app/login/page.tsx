import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="w-full flex justify-center items-center py-20">
      <div className="w-[742px] h-[590px] bg-white rounded-[20px] shadow-md flex flex-col items-center px-10 py-12 text-center">

        <h1 className="text-[32px] font-bold text-main-red">
          Heureux de vous revoir
        </h1>

        <p className="mt-4 text-[14px] text-black font-normal leading-relaxed max-w-[500px]">
          Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.
        </p>

        <LoginForm />

      </div>
    </main>
  );
}

import RegisterForm from "@/components/register/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="w-full flex justify-center items-center py-20">
      <div className="w-[742px] h-[797px] bg-white rounded-[20px] shadow-md flex flex-col items-center px-10 py-12 text-center">

        <h1 className="text-[32px] font-bold text-main-red">
          Rejoignez la communauté Kasa
        </h1>

        <p className="mt-4 text-[14px] text-black font-normal leading-relaxed max-w-[550px]">
          Créez votre compte et commencez à voyager autrement : réservez des logements uniques,
          découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.
        </p>

        <RegisterForm />
      </div>
    </main>
  );
}

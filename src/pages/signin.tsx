import type { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="min-h-screen bg-olive-one p-0 selection:bg-green-two md:px-8 md:py-24">
        <div className="flex flex-col items-center space-y-20 pt-40">
          <Image
            src="/images/github-icon.png"
            width={170}
            height={170}
            alt="fithub-icon"
          />
          <div className="text-center">
            <div className="mx-auto max-w-3xl">
              <div className="flexjustify-center"></div>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-md p-4 text-xl font-bold hover:text-green-five"
                    onClick={() =>
                      void signIn(provider.id, {
                        callbackUrl: "/",
                      })
                    }
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

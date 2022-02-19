import type { NextPage } from "next";
import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ClashLogo from "../components/icons/ClashLogo";
import TeamHeader from "../components/icons/TeamHeader";
import TeamIcon from "../components/icons/TeamIcon";

const Home: NextPage = () => {
    const [allyTeam, setAllyTeam] = useState("");
    const [enemyTeam, setEnemyTeam] = useState("");

    const onSubmit = () => {};

    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            <div className="relative h-screen w-full">
                <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-dark font-header">
                    <ClashLogo className="absolute left-1/2 top-1/2 w-[800px] -translate-x-1/2 -translate-y-1/2 transform text-white opacity-5" />

                    <h1 className="z-20 text-8xl font-bold tracking-wider text-primary">
                        LEAGUE OF{" "}
                        <span className="block text-[10.25rem]">CLASH</span>
                    </h1>
                </div>
                <svg
                    className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-dark lg:block"
                    fill="currentColor"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <polygon points="50,0 100,0 50,100 0,100"></polygon>
                </svg>
            </div>

            <div className="flex h-screen w-full items-center justify-center bg-primary text-dark">
                <div className="flex flex-col items-center">
                    <h2 className="mb-4 font-header text-5xl uppercase">
                        Clash
                    </h2>
                    <TeamHeader className="w-96 text-dark">
                        <TeamIcon className="w-6" />
                    </TeamHeader>

                    <form className="mt-2 w-full" onSubmit={onSubmit}>
                        <Input
                            placeholder="Ally team"
                            value={allyTeam}
                            onChange={setAllyTeam}
                        />
                        <Input
                            placeholder="Enemy team"
                            value={enemyTeam}
                            onChange={setEnemyTeam}
                        />
                        <Button>Go</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;

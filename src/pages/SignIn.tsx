import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const { setName, setUserType } = useAuth();
    const [userRol, setUserRol] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName || !userRol) return;

        try {
            const res = await axios.get("/api/sign-in", { params: { name: userName } });

            setName(userName);
            setUserType(userRol);
            console.log("Signed in:", res.data);

            navigate(`/${userRol}`);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const users = [
        { email: "sam@gmail.com", name: "Sammy Johnson" },
        { email: "voyageruser@gmail.com", name: "Voyage User" },
        { email: "mediauser@gmail.com", name: "Media User" },
    ];

    const companies = [
        { email: "contact@virginatlantic.com", name: "Virgin Atlantic" },
        { email: "contact@virginvoyages.com", name: "Virgin Voyages" },
        { email: "contact@virginmedia02.com", name: "Virgin Media 02" },
    ];

    return (
        <div className="max-w-sm mx-auto text-center mt-10">
            <h1 className="text-3xl font-bold mb-6">Sign In</h1>
            <div className="flex flex-col gap-4 w-full">
                <button
                    onClick={() => setUserRol("user")}
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-orange-600 transition-colors"
                >
                    I'm a user
                    <ArrowRight className="h-5 w-5" />
                </button>
                <button
                    onClick={() => setUserRol("company")}
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-orange-600 transition-colors"
                >
                    I'm a company
                    <ArrowRight className="h-5 w-5" />
                </button>

                {userRol && (
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <label className="block text-left text-gray-700 font-medium mb-2">
                            Select an option:
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        >
                            <option value="">Choose an option</option>
                            {(userRol === "user" ? users : companies).map((obj) => (
                                <option key={obj.email} value={obj.name}>
                                    {obj.name}
                                </option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="mt-4 w-full bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                            disabled={!userName} // Disable if no name is selected
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUp;

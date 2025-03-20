import React from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <MobileLayout>
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <h1 className="text-3xl font-bold mb-6">Sign In</h1>
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <Link 
                        to="/user" 
                        className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                        I'm a user
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link 
                        to="/company" 
                        className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                        I'm a company
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </MobileLayout>
    );
};

export default SignUp;

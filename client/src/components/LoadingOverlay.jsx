import { Loader2 } from 'lucide-react';

export default function LoadingOverlay({ isLoading }) {
    if (!isLoading) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white/80 backdrop-blur-strong z-50 flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
                    <Loader2 className="relative w-16 h-16 mx-auto animate-spin text-blue-600" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">
                        Analyzing Resume...
                    </h3>
                    <p className="text-slate-600 text-base">
                        This may take a few moments
                    </p>
                </div>
            </div>
        </div>
    );
}

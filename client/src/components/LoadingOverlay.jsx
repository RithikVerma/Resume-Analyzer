import { Loader2 } from 'lucide-react';

export default function LoadingOverlay({ isLoading }) {
    if (!isLoading) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-slate-900" />
                <h3 className="text-xl font-semibold mb-1 text-slate-900">
                    Analyzing Resume...
                </h3>
                <p className="text-slate-600 text-sm">
                    This may take a few moments
                </p>
            </div>
        </div>
    );
}

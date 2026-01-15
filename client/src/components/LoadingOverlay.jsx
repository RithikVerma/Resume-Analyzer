export default function LoadingOverlay({ isLoading }) {
    if (!isLoading) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-bg-primary/95 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <h3 className="text-2xl font-heading mb-2 text-gradient">
                    Analyzing Resume...
                </h3>
                <p className="text-gray-400">
                    Extracting skills, calculating match score, and generating recommendations
                </p>
            </div>
        </div>
    );
}

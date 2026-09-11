import './PageLoader.css';

export function PageLoader() {
    return (
        <main className="page-loader" aria-busy="true" aria-label="Loading page">
            <div className="page-loader-orbit" aria-hidden="true">
                <span className="page-loader-core" />
                <span className="page-loader-ring page-loader-ring-primary" />
                <span className="page-loader-ring page-loader-ring-secondary" />
            </div>
            <p className="page-loader-label">Loading</p>
        </main>
    );
}

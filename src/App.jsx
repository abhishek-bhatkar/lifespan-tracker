import { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import LifeGrid from './components/LifeGrid';
import SummaryPanel from './components/SummaryPanel';
import ExportButton from './components/ExportButton';
import { loadData, saveData, clearData } from './utils/storage';

/**
 * Main Application Component
 * Manages state and coordinates between input, visualization, and export
 */
function App() {
    // State for user inputs
    const [birthDate, setBirthDate] = useState(null);
    const [lifespan, setLifespan] = useState(80);
    const [showGrid, setShowGrid] = useState(false);

    // Load persisted data on mount
    useEffect(() => {
        const stored = loadData();
        if (stored) {
            setBirthDate(new Date(stored.birthDate));
            setLifespan(stored.lifespan);
            setShowGrid(true);
        }
    }, []);

    // Persist data when it changes
    useEffect(() => {
        if (birthDate) {
            saveData({
                birthDate: birthDate.toISOString(),
                lifespan
            });
        }
    }, [birthDate, lifespan]);

    // Handle form submission
    const handleSubmit = (date, years) => {
        setBirthDate(date);
        setLifespan(years);
        setShowGrid(true);
    };

    // Handle reset
    const handleReset = () => {
        clearData();
        setBirthDate(null);
        setLifespan(80);
        setShowGrid(false);
    };

    // Handle lifespan change from slider
    const handleLifespanChange = (years) => {
        setLifespan(years);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Life in Weeks</h1>
                <p className="app-subtitle">A contemplative view of time</p>
            </header>

            {!showGrid ? (
                <InputForm onSubmit={handleSubmit} initialLifespan={lifespan} />
            ) : (
                <>
                    <SummaryPanel birthDate={birthDate} lifespan={lifespan} />

                    <p className="reflective-quote">
                        "Each square is one week of your life."
                    </p>

                    <LifeGrid
                        birthDate={birthDate}
                        lifespan={lifespan}
                        onLifespanChange={handleLifespanChange}
                    />

                    <div className="export-section">
                        <ExportButton birthDate={birthDate} lifespan={lifespan} />
                        <div style={{ marginTop: '1rem' }}>
                            <button className="btn btn-secondary" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;

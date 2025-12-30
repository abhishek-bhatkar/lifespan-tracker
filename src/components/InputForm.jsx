import { useState } from 'react';

/**
 * Input form for date of birth and expected lifespan
 * Validates inputs before allowing submission
 */
function InputForm({ onSubmit, initialLifespan }) {
    const [dateValue, setDateValue] = useState('');
    const [lifespan, setLifespan] = useState(initialLifespan);
    const [error, setError] = useState('');

    // Get today's date in YYYY-MM-DD format for max attribute
    const today = new Date().toISOString().split('T')[0];

    // Validate and submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!dateValue) {
            setError('Please enter your date of birth');
            return;
        }

        const date = new Date(dateValue);
        const now = new Date();

        // Validation: no future dates
        if (date > now) {
            setError('Date of birth cannot be in the future');
            return;
        }

        // Validation: reasonable age (not more than 150 years ago)
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 150);
        if (date < minDate) {
            setError('Please enter a valid date of birth');
            return;
        }

        onSubmit(date, lifespan);
    };

    // Ensure lifespan stays in valid range
    const handleLifespanChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 40 && value <= 120) {
            setLifespan(value);
        }
    };

    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label" htmlFor="dob">
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="dob"
                    className="form-input"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    max={today}
                    required
                />
                {error && <span className="form-error">{error}</span>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="lifespan">
                    Expected Lifespan
                </label>
                <div className="lifespan-display">
                    <input
                        type="range"
                        id="lifespan"
                        className="lifespan-slider"
                        min="40"
                        max="120"
                        value={lifespan}
                        onChange={handleLifespanChange}
                    />
                    <span className="lifespan-value">{lifespan} years</span>
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    Visualize Life
                </button>
            </div>
        </form>
    );
}

export default InputForm;

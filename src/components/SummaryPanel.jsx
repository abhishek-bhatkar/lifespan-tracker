import {
    calculateWeeksLived,
    calculateTotalWeeks,
    calculateWeeksRemaining,
    calculateCompletionPercentage,
    calculateAge
} from '../utils/calculations';

/**
 * Summary panel displaying key statistics
 * Clean, understated numbers without celebratory language
 */
function SummaryPanel({ birthDate, lifespan }) {
    const age = calculateAge(birthDate);
    const weeksLived = calculateWeeksLived(birthDate);
    const weeksRemaining = calculateWeeksRemaining(birthDate, lifespan);
    const percentage = calculateCompletionPercentage(birthDate, lifespan);

    // Format large numbers with commas
    const formatNumber = (num) => num.toLocaleString();

    // Format percentage to one decimal
    const formatPercentage = (num) => num.toFixed(1);

    return (
        <div className="summary-panel">
            <div className="summary-item">
                <div className="summary-value">{age}</div>
                <div className="summary-label">Years</div>
            </div>

            <div className="summary-item">
                <div className="summary-value">{formatNumber(weeksLived)}</div>
                <div className="summary-label">Weeks Lived</div>
            </div>

            <div className="summary-item">
                <div className="summary-value">{formatNumber(weeksRemaining)}</div>
                <div className="summary-label">Weeks Ahead</div>
            </div>

            <div className="summary-item">
                <div className="summary-value">{formatPercentage(percentage)}%</div>
                <div className="summary-label">Of Journey</div>
            </div>
        </div>
    );
}

export default SummaryPanel;

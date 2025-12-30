import { useState, useCallback, useMemo } from 'react';
import {
    calculateTotalWeeks,
    calculateWeeksLived,
    getWeekDateRange,
    formatDateRange
} from '../utils/calculations';

/**
 * Life grid visualization
 * Renders weekly blocks: past (filled with time gradient), future (outline), current (breathing)
 * Time gradient: warm sepia (early life) → neutral → cool slate (recent)
 */
function LifeGrid({ birthDate, lifespan }) {
    const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

    const totalWeeks = calculateTotalWeeks(lifespan);
    const weeksLived = calculateWeeksLived(birthDate);
    const currentWeekIndex = weeksLived;

    // Generate week data with time-gradient coloring
    const weeks = useMemo(() => {
        const result = [];

        // Define gradient thresholds (percentage of life lived)
        const earlyThreshold = 0.33; // First third = warm
        const recentThreshold = 0.66; // Last third = cool

        for (let i = 0; i < totalWeeks; i++) {
            let status;
            let gradientClass = '';

            if (i < weeksLived) {
                status = 'lived';

                // Calculate position in lived weeks for gradient
                const position = weeksLived > 0 ? i / weeksLived : 0;

                if (position < earlyThreshold) {
                    gradientClass = 'early';
                } else if (position > recentThreshold) {
                    gradientClass = 'recent';
                }
                // Middle section uses default 'lived' color

            } else if (i === currentWeekIndex) {
                status = 'current';
            } else {
                status = 'future';
            }

            // Calculate animation delay for staggered reveal (by year)
            const year = Math.floor(i / 52);
            const animationDelay = `${year * 0.02}s`;

            result.push({
                index: i,
                status,
                gradientClass,
                animationDelay
            });
        }
        return result;
    }, [totalWeeks, weeksLived, currentWeekIndex]);

    // Handle hover/touch for tooltip
    const handleMouseEnter = useCallback((e, weekIndex) => {
        const { start, end } = getWeekDateRange(birthDate, weekIndex);
        const text = formatDateRange(start, end);
        const rect = e.target.getBoundingClientRect();

        setTooltip({
            visible: true,
            text,
            x: rect.left + rect.width / 2,
            y: rect.top - 8
        });
    }, [birthDate]);

    const handleMouseLeave = useCallback(() => {
        setTooltip(prev => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className="life-grid-container">
            <div className="life-grid" role="img" aria-label="Life visualization grid">
                {weeks.map(({ index, status, gradientClass, animationDelay }) => (
                    <div
                        key={index}
                        className={`week ${status} ${gradientClass}`}
                        style={{ animationDelay }}
                        onMouseEnter={(e) => handleMouseEnter(e, index)}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={(e) => handleMouseEnter(e, index)}
                        aria-label={`Week ${index + 1}, ${status}`}
                    />
                ))}
            </div>

            {/* Tooltip */}
            <div
                className={`tooltip ${tooltip.visible ? 'visible' : ''}`}
                style={{
                    left: tooltip.x,
                    top: tooltip.y,
                    transform: 'translate(-50%, -100%)'
                }}
            >
                {tooltip.text}
            </div>
        </div>
    );
}

export default LifeGrid;

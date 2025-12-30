import { useState, useCallback, useMemo } from 'react';
import {
    calculateTotalWeeks,
    calculateWeeksLived,
    getWeekDateRange,
    formatDateRange
} from '../utils/calculations';

/**
 * Life grid visualization
 * Renders weekly blocks: past (filled), future (outline), current (highlighted)
 * Optimized for performance with minimal DOM elements
 */
function LifeGrid({ birthDate, lifespan }) {
    const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

    const totalWeeks = calculateTotalWeeks(lifespan);
    const weeksLived = calculateWeeksLived(birthDate);
    const currentWeekIndex = weeksLived; // 0-indexed, so this is the current week

    // Generate week data — memoized for performance
    const weeks = useMemo(() => {
        const result = [];
        for (let i = 0; i < totalWeeks; i++) {
            let status;
            if (i < weeksLived) {
                status = 'lived';
            } else if (i === currentWeekIndex) {
                status = 'current';
            } else {
                status = 'future';
            }
            result.push({ index: i, status });
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
                {weeks.map(({ index, status }) => (
                    <div
                        key={index}
                        className={`week ${status}`}
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

/**
 * Core calculation functions for the lifespan tracker
 * All date calculations assume weeks are 7 days exactly
 */

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
const WEEKS_PER_YEAR = 52;

/**
 * Calculate the number of complete weeks lived since birth
 * @param {Date} birthDate - Date of birth
 * @returns {number} Number of complete weeks lived
 */
export function calculateWeeksLived(birthDate) {
    const today = new Date();
    const diffMs = today.getTime() - birthDate.getTime();
    return Math.floor(diffMs / MS_PER_WEEK);
}

/**
 * Calculate total weeks in expected lifespan
 * @param {number} lifespan - Expected lifespan in years
 * @returns {number} Total weeks
 */
export function calculateTotalWeeks(lifespan) {
    return lifespan * WEEKS_PER_YEAR;
}

/**
 * Calculate remaining weeks
 * @param {Date} birthDate - Date of birth
 * @param {number} lifespan - Expected lifespan in years
 * @returns {number} Weeks remaining (can be negative if past expected lifespan)
 */
export function calculateWeeksRemaining(birthDate, lifespan) {
    const total = calculateTotalWeeks(lifespan);
    const lived = calculateWeeksLived(birthDate);
    return Math.max(0, total - lived);
}

/**
 * Calculate completion percentage
 * @param {Date} birthDate - Date of birth
 * @param {number} lifespan - Expected lifespan in years
 * @returns {number} Percentage (0-100)
 */
export function calculateCompletionPercentage(birthDate, lifespan) {
    const total = calculateTotalWeeks(lifespan);
    const lived = calculateWeeksLived(birthDate);
    return Math.min(100, (lived / total) * 100);
}

/**
 * Calculate age in years
 * @param {Date} birthDate - Date of birth
 * @returns {number} Age in complete years
 */
export function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

/**
 * Get the date range for a specific week
 * @param {Date} birthDate - Date of birth
 * @param {number} weekIndex - Week index (0-based)
 * @returns {{ start: Date, end: Date }} Start and end dates of the week
 */
export function getWeekDateRange(birthDate, weekIndex) {
    const startMs = birthDate.getTime() + (weekIndex * MS_PER_WEEK);
    const endMs = startMs + MS_PER_WEEK - 1;

    return {
        start: new Date(startMs),
        end: new Date(endMs)
    };
}

/**
 * Format a date range for display
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {string} Formatted date range string
 */
export function formatDateRange(start, end) {
    const options = { month: 'short', day: 'numeric' };
    const yearOptions = { ...options, year: 'numeric' };

    const startStr = start.toLocaleDateString('en-US', options);
    const endStr = end.toLocaleDateString('en-US',
        start.getFullYear() === end.getFullYear() ? options : yearOptions
    );
    const year = end.getFullYear();

    return `${startStr} – ${endStr}, ${year}`;
}

/**
 * Get the current week index (0-based)
 * @param {Date} birthDate - Date of birth
 * @returns {number} Current week index
 */
export function getCurrentWeekIndex(birthDate) {
    return calculateWeeksLived(birthDate);
}

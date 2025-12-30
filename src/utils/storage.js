/**
 * localStorage helpers for persisting user data
 * Data is stored without any personal identifiers beyond the birth date
 */

const STORAGE_KEY = 'lifespan-tracker-data';

/**
 * Save user data to localStorage
 * @param {{ birthDate: string, lifespan: number }} data
 */
export function saveData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        // localStorage might be unavailable (private browsing, etc.)
        console.warn('Could not save data to localStorage:', e);
    }
}

/**
 * Load user data from localStorage
 * @returns {{ birthDate: string, lifespan: number } | null}
 */
export function loadData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Could not load data from localStorage:', e);
    }
    return null;
}

/**
 * Clear all stored data
 */
export function clearData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn('Could not clear localStorage:', e);
    }
}

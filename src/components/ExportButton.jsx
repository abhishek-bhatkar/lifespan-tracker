import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
    calculateWeeksLived,
    calculateTotalWeeks,
    calculateWeeksRemaining,
    calculateCompletionPercentage,
    calculateAge
} from '../utils/calculations';

/**
 * Export button that generates a high-resolution PNG for sharing
 * Creates a temporary visible canvas for html2canvas to capture
 * No personal data (name, birthdate) is included — privacy first
 */
function ExportButton({ birthDate, lifespan }) {
    const [isExporting, setIsExporting] = useState(false);

    const totalWeeks = calculateTotalWeeks(lifespan);
    const weeksLived = calculateWeeksLived(birthDate);
    const weeksRemaining = calculateWeeksRemaining(birthDate, lifespan);
    const percentage = calculateCompletionPercentage(birthDate, lifespan);
    const age = calculateAge(birthDate);

    const handleExport = async () => {
        setIsExporting(true);

        // Create a temporary container for export
        const container = document.createElement('div');
        container.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 1080px;
            height: 1350px;
            background: #fafaf9;
            padding: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: -1;
            opacity: 0;
            pointer-events: none;
        `;

        // Build the export content HTML
        container.innerHTML = `
            <p style="
                font-size: 1.5rem;
                color: #78716c;
                font-style: italic;
                text-align: center;
                margin-bottom: 3rem;
                max-width: 600px;
            ">
                "Each square is one week of your life."
            </p>
            
            <div style="
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 3rem;
                margin-bottom: 3rem;
                padding: 2rem;
            ">
                <div style="text-align: center; min-width: 80px;">
                    <div style="font-size: 2.5rem; font-weight: 300; color: #292524; line-height: 1.2;">${age}</div>
                    <div style="font-size: 0.75rem; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem;">Years</div>
                </div>
                <div style="text-align: center; min-width: 80px;">
                    <div style="font-size: 2.5rem; font-weight: 300; color: #292524; line-height: 1.2;">${weeksLived.toLocaleString()}</div>
                    <div style="font-size: 0.75rem; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem;">Weeks Lived</div>
                </div>
                <div style="text-align: center; min-width: 80px;">
                    <div style="font-size: 2.5rem; font-weight: 300; color: #292524; line-height: 1.2;">${weeksRemaining.toLocaleString()}</div>
                    <div style="font-size: 0.75rem; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem;">Weeks Ahead</div>
                </div>
                <div style="text-align: center; min-width: 80px;">
                    <div style="font-size: 2.5rem; font-weight: 300; color: #292524; line-height: 1.2;">${percentage.toFixed(1)}%</div>
                    <div style="font-size: 0.75rem; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem;">Of Journey</div>
                </div>
            </div>
            
            <div id="export-grid" style="
                display: grid;
                grid-template-columns: repeat(52, 10px);
                gap: 2px;
                justify-content: center;
            "></div>
            
            <p style="
                margin-top: 3rem;
                font-size: 0.875rem;
                color: #a8a29e;
            ">
                Life in Weeks
            </p>
        `;

        document.body.appendChild(container);

        // Generate week squares
        const gridContainer = container.querySelector('#export-grid');
        for (let i = 0; i < totalWeeks; i++) {
            const week = document.createElement('div');
            week.style.cssText = `
                width: 10px;
                height: 10px;
                border-radius: 1px;
            `;

            if (i < weeksLived) {
                // Past week - filled
                week.style.backgroundColor = '#78716c';
            } else if (i === weeksLived) {
                // Current week - highlighted
                week.style.backgroundColor = '#44403c';
                week.style.boxShadow = '0 0 0 2px rgba(68, 64, 60, 0.3)';
            } else {
                // Future week - outline
                week.style.backgroundColor = 'transparent';
                week.style.border = '1px solid #e7e5e4';
                week.style.width = '8px';
                week.style.height = '8px';
            }

            gridContainer.appendChild(week);
        }

        // Make temporarily visible for html2canvas
        container.style.opacity = '1';
        container.style.zIndex = '9999';

        try {
            // Small delay to ensure rendering
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(container, {
                backgroundColor: '#fafaf9',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
                width: 1080,
                height: 1350
            });

            // Use dataURL approach instead of blob for better compatibility
            const dataUrl = canvas.toDataURL('image/png');

            // Create download link
            const link = document.createElement('a');
            link.download = 'life-in-weeks.png';
            link.href = dataUrl;
            link.click();

            setIsExporting(false);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Please try again.');
            setIsExporting(false);
        } finally {
            // Cleanup
            document.body.removeChild(container);
        }
    };

    return (
        <button
            className="btn-export"
            onClick={handleExport}
            disabled={isExporting}
        >
            {isExporting ? 'Generating...' : 'Share Image'}
        </button>
    );
}

export default ExportButton;

export const dataBasePath = (import.meta.env.BASE_URL ?? '/') + 'data';
export const backendBaseUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000';
export const exportsCdnBaseUrl = import.meta.env.VITE_EXPORTS_CDN_BASE_URL ?? 'http://localhost:8081/worlds';

export const defaultOs = (() => {
    try {
        const platform = navigator?.platform?.toLowerCase() ?? '';
        if (platform.includes('linux')) return 'linux';
        if (platform.includes('win')) return 'windows';
    } catch (e) {
        // fallback
    }
    return 'windows';
})();

export type LandingExportOs = 'linux' | 'windows';
export type LandingExportApp = 'ftr_world_editor' | 'ftr_game';

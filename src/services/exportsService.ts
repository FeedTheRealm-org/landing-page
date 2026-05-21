import { backendBaseUrl, exportsCdnBaseUrl } from './config';
import type { LandingExportApp, LandingExportOs } from './config';

const buildDownloadUrl = (path: string) => {
    const base = exportsCdnBaseUrl.replace(/\/$/, '');
    return `${base}/${path.replace(/^\//, '')}`;
};

export const getExportZipPath = async (input: { appName: LandingExportApp; os: LandingExportOs; version?: string }) => {
    const params = new URLSearchParams();
    params.set('app', input.appName);
    params.set('os', input.os);
    if (input.version) params.set('version', input.version);

    const base = backendBaseUrl.replace(/\/$/, '');
    const res = await fetch(`${base}/exports/zip?${params.toString()}`);
    if (!res.ok && res.status !== 404) {
        const body = await res.text().catch(() => '');
        throw new Error(body ? `Failed to fetch export path: ${body}` : 'Failed to fetch export path');
    } else if (res.status === 404) {
        throw new Error('No download available for the selected app and OS');
    }

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
        const body = await res.text();
        throw new Error(`Unexpected response from exports API: ${body.slice(0, 120)}`);
    }

    const data = await res.json() as { data: { path: string } };
    if (!data.data.path) {
        throw new Error('Exports API did not return a path');
    }
    return buildDownloadUrl(data.data.path);
};

export const getExportDownloadUrl = (path: string) => buildDownloadUrl(path);

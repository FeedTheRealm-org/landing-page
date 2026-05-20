import { exportsCdnBaseUrl } from './config';
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

  const res = await fetch(`/exports/zip?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch export path');
  const data = await res.json();
  return buildDownloadUrl(data.path);
};

export const getExportDownloadUrl = (path: string) => buildDownloadUrl(path);

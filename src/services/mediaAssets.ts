import { dataBasePath } from './config';

type MediaImagesManifest = string[];

function extractYouTubeVideoId(videoUrl: string): string {
    try {
        const url = new URL(videoUrl);

        if (url.hostname.includes('youtu.be')) {
            return url.pathname.split('/').filter(Boolean)[0] ?? '';
        }

        const searchVideoId = url.searchParams.get('v');
        if (searchVideoId) {
            return searchVideoId;
        }

        const pathParts = url.pathname.split('/').filter(Boolean);
        const embedIndex = pathParts.indexOf('embed');
        if (embedIndex >= 0 && pathParts[embedIndex + 1]) {
            return pathParts[embedIndex + 1];
        }
    } catch (e) {
        // fall through to empty result
    }

    return '';
}

export async function loadMediaImageUrls(): Promise<string[]> {
    try {
        const manifestRes = await fetch(`${dataBasePath}/media-page/manifest.json`);
        if (manifestRes.ok) {
            const files = (await manifestRes.json()) as MediaImagesManifest;
            return files.map((file) => `${dataBasePath}/media-page/imgs/${file}`);
        }
    } catch (e) {
        // ignore and fall through to empty result
    }

    return [];
}

export function getYouTubeVideoId(videoUrl: string): string {
    return extractYouTubeVideoId(videoUrl);
}

export function getYouTubeEmbedUrl(videoUrl: string): string {
    const videoId = extractYouTubeVideoId(videoUrl);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
}

export function getYouTubeThumbnailUrl(videoUrl: string): string {
    const videoId = extractYouTubeVideoId(videoUrl);
    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '';
}
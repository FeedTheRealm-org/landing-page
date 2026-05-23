import { dataBasePath } from './config';

type MediaImagesManifest = string[];

export async function loadMediaImageUrls(): Promise<string[]> {
    try {
        const manifestRes = await fetch(`${dataBasePath}/media-page/manifest.json`);
        if (manifestRes.ok) {
            const files = (await manifestRes.json()) as MediaImagesManifest;
            return files.map((file) => `${dataBasePath}/media-page/imgs/${file}`);
        }
    } catch (e) {
        // fall back to glob loading below
    }

    try {
        const imageModules = import.meta.glob('/data/media-page/imgs/*', { query: '?url', import: 'default' });
        const imageList = await Promise.all(
            Object.keys(imageModules)
                .sort()
                .map(async (path) => (await imageModules[path]()) as string),
        );
        return imageList;
    } catch (e) {
        return [];
    }
}
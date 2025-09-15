/**
 * ScreenshotOne API utility for generating website screenshots
 * API Documentation: https://screenshotone.com/docs/
 */

interface ScreenshotOptions {
  url: string
  width?: number
  height?: number
  fullPage?: boolean
  deviceScaleFactor?: number
  format?: 'png' | 'jpg' | 'webp'
  quality?: number
  cache?: boolean
  blockAds?: boolean
  blockCookieBanners?: boolean
  blockTrackers?: boolean
  darkMode?: boolean
}

export function generateScreenshotUrl(options: ScreenshotOptions): string {
  // Use the public access key directly for client-side usage
  const accessKey = 'wfxpWMabPZFCqA'
  
  const params = new URLSearchParams({
    url: options.url,
    access_key: accessKey,
    viewport_width: (options.width || 1200).toString(),
    viewport_height: (options.height || 800).toString(),
    device_scale_factor: (options.deviceScaleFactor || 1).toString(),
    format: options.format || 'png',
    cache: (options.cache !== false).toString(),
    full_page: (options.fullPage || false).toString(),
    block_ads: (options.blockAds !== false).toString(),
    block_cookie_banners: (options.blockCookieBanners !== false).toString(),
    block_trackers: (options.blockTrackers !== false).toString(),
  })

  if (options.quality && options.format !== 'png') {
    params.append('quality', options.quality.toString())
  }

  if (options.darkMode) {
    params.append('dark_mode', 'true')
  }

  return `https://api.screenshotone.com/take?${params.toString()}`
}

export function getClientWebsiteScreenshot(websiteUrl: string): string {
  return generateScreenshotUrl({
    url: websiteUrl,
    width: 1200,
    height: 800,
    fullPage: false,
    cache: true,
    blockAds: true,
    blockCookieBanners: true,
    blockTrackers: true,
    format: 'png',
  })
}

export function getMobileWebsiteScreenshot(websiteUrl: string): string {
  return generateScreenshotUrl({
    url: websiteUrl,
    width: 375,
    height: 667,
    fullPage: false,
    cache: true,
    blockAds: true,
    blockCookieBanners: true,
    deviceScaleFactor: 2,
    format: 'png',
  })
}

export function getFullPageScreenshot(websiteUrl: string): string {
  return generateScreenshotUrl({
    url: websiteUrl,
    width: 1200,
    height: 800,
    fullPage: true,
    cache: true,
    blockAds: true,
    blockCookieBanners: true,
    format: 'png',
  })
}

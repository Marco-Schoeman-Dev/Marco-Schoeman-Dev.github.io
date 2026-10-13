import { images, type ImageKey } from '../data/images'

interface PictureProps {
  image: ImageKey
  alt: string
  sizes: string
  className?: string
  imgClassName?: string
  /** Above-the-fold images: eager + high priority. Everything else lazy. */
  priority?: boolean
  /** Art direction: swap to another image below this media query */
  mobile?: { image: ImageKey; media: string; sizes?: string }
}

const srcset = (list: string[]) => list.join(', ')

/** AVIF → WebP → fallback, with intrinsic width/height to prevent layout shift. */
export function Picture({ image, alt, sizes, className, imgClassName, priority, mobile }: PictureProps) {
  const img = images[image]
  const alt2 = mobile ? images[mobile.image] : null

  return (
    <picture className={className}>
      {mobile && alt2 && (
        <>
          <source type="image/avif" media={mobile.media} srcSet={srcset(alt2.avif)} sizes={mobile.sizes ?? sizes} width={alt2.width} height={alt2.height} />
          <source type="image/webp" media={mobile.media} srcSet={srcset(alt2.webp)} sizes={mobile.sizes ?? sizes} width={alt2.width} height={alt2.height} />
        </>
      )}
      <source type="image/avif" srcSet={srcset(img.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(img.webp)} sizes={sizes} />
      <img
        src={img.fallback}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
      />
    </picture>
  )
}

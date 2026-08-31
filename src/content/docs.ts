export const docCategories = ['Getting started', 'Prompting', 'Styles and editing', 'Account'] as const

export type DocCategory = (typeof docCategories)[number]

export const categoryEmoji: Record<DocCategory, string> = {
  'Getting started': '🚀',
  Prompting: '✍️',
  'Styles and editing': '🎨',
  Account: '👤',
}

export type DocArticle = {
  slug: string
  title: string
  summary: string
  category: DocCategory
  /** Each entry is one paragraph. */
  body: string[]
}

export const docs: DocArticle[] = [
  {
    slug: 'your-first-image',
    title: 'Your first image',
    summary: 'Go from sign-up to your first picture in under a minute.',
    category: 'Getting started',
    body: [
      'Sign in, type what you want to see into the prompt box, and press Enter. Dreamshot creates four versions of your idea in about five seconds.',
      'Click the one you like best to open it full size. From there you can save it, download it, or keep going with a variation.',
    ],
  },
  {
    slug: 'how-credits-work',
    title: 'How credits work',
    summary: 'Every image costs one credit. Here is how to get more.',
    category: 'Getting started',
    body: [
      'Each generated image uses one credit, so a normal four-image batch uses four. Upscaling and edits also cost one credit each.',
      'Credits reset on the first day of every billing month. If you run out early, upgrade your plan or wait for the reset. Unused credits do not roll over.',
    ],
  },
  {
    slug: 'saving-and-downloading',
    title: 'Saving and downloading',
    summary: 'Keep your favorites and download them in full resolution.',
    category: 'Getting started',
    body: [
      'Hover over any image and click the heart to save it to your Favorites. Everything you have ever generated is also kept in your History for 30 days.',
      'Click Download to get a PNG. Free images come with a small watermark in the corner; Pro and Studio downloads are clean.',
    ],
  },
  {
    slug: 'sharing-your-images',
    title: 'Sharing your images',
    summary: 'Send a link or post straight to your socials.',
    category: 'Getting started',
    body: [
      'Every image has a Share button that creates a public link. Anyone with the link can view the image and the prompt that made it.',
      'Prefer to keep your prompt secret? Turn off Show prompt before copying the link and only the picture will be shared.',
    ],
  },
  {
    slug: 'writing-great-prompts',
    title: 'Writing great prompts',
    summary: 'Subject, setting, style: the three-part recipe that just works.',
    category: 'Prompting',
    body: [
      'Start with the subject, add where it is, then say how it should look. “A red fox, in a snowy forest, as a watercolor painting” beats “fox picture” every time.',
      'Be specific about the details you care about, such as lighting, mood or camera angle, and leave the rest to Dreamshot. Short prompts give it more creative freedom.',
    ],
  },
  {
    slug: 'negative-prompts',
    title: 'Negative prompts',
    summary: 'Tell Dreamshot what you do not want to see.',
    category: 'Prompting',
    body: [
      'Open Advanced under the prompt box and list anything you want left out, separated by commas. For example: text, blurry, extra fingers.',
      'Negative prompts work best for small fixes. If an image is completely wrong, rewrite the main prompt instead.',
    ],
  },
  {
    slug: 'aspect-ratios',
    title: 'Aspect ratios',
    summary: 'Square, portrait or widescreen. Pick the right shape.',
    category: 'Prompting',
    body: [
      'Choose a shape before you generate: 1:1 for profile pictures, 4:5 for social posts, 9:16 for stories and 16:9 for wallpapers and thumbnails.',
      'Changing the ratio changes the whole composition, not just the crop, so it is worth picking the right one up front.',
    ],
  },
  {
    slug: 'using-reference-images',
    title: 'Using reference images',
    summary: 'Upload a photo and let Dreamshot riff on it.',
    category: 'Prompting',
    body: [
      'Drag a photo onto the prompt box to use it as a reference. Dreamshot keeps its layout and colors and applies your prompt on top.',
      'Use the Influence slider to decide how closely the result follows your photo. Low values are loose inspiration; high values stay very close.',
    ],
  },
  {
    slug: 'seeds-and-variations',
    title: 'Seeds and variations',
    summary: 'Recreate an image exactly, or explore its close cousins.',
    category: 'Prompting',
    body: [
      'Every image has a seed number. Use the same prompt with the same seed and you get the same picture back, which is handy for small prompt tweaks.',
      'Click Variations on any image to get four new takes that keep the overall idea but change the details.',
    ],
  },
  {
    slug: 'style-presets',
    title: 'Style presets',
    summary: 'One click to go from photo to anime to watercolor.',
    category: 'Styles and editing',
    body: [
      'Pick a style from the row under the prompt box and it is added to your prompt automatically. There are more than 40, from Film Photo to Claymation.',
      'You can combine a preset with your own style words. If they clash, your words win.',
    ],
  },
  {
    slug: 'edit-with-words',
    title: 'Edit with words',
    summary: 'Change an image by describing what should be different.',
    category: 'Styles and editing',
    body: [
      'Open an image and type an instruction like “make it night time” or “give the cat a tiny hat”. Dreamshot changes only what you asked for.',
      'To change one area, paint over it with the brush tool first. Edits are saved as new versions, so the original is never lost.',
    ],
  },
  {
    slug: 'upscaling-to-4k',
    title: 'Upscaling to 4K',
    summary: 'Turn any image into a print-ready file.',
    category: 'Styles and editing',
    body: [
      'Click Upscale on any image to get a 4096 by 4096 version with sharper details. It takes about ten seconds and costs one credit.',
      'Upscaled files are big, so they are downloaded as high-quality JPEGs by default. Switch to PNG in Settings if you need lossless files.',
    ],
  },
  {
    slug: 'plans-and-billing',
    title: 'Plans and billing',
    summary: 'Upgrade, downgrade or cancel whenever you like.',
    category: 'Account',
    body: [
      'Upgrades start right away and you only pay the difference for the rest of the month. Downgrades and cancellations take effect at the end of your billing period.',
      'Receipts are emailed to you every month and are also available under Settings, then Billing.',
    ],
  },
  {
    slug: 'commercial-use',
    title: 'Commercial use',
    summary: 'When you can use your images for business.',
    category: 'Account',
    body: [
      'Images made on the Studio plan come with a full commercial license. Use them in ads, merch, book covers or client work.',
      'Free and Pro images are for personal use, like wallpapers, gifts and social posts. Upgrading later does not change the license of images you already made.',
    ],
  },
  {
    slug: 'deleting-your-data',
    title: 'Deleting your data',
    summary: 'Remove single images or your whole account for good.',
    category: 'Account',
    body: [
      'Delete any image from its menu and it is gone from your History, Favorites and any share links right away.',
      'To delete your account, go to Settings, then Account, then Delete account. Everything is permanently removed within 7 days.',
    ],
  },
]

export function articlesInCategory(category: DocCategory): DocArticle[] {
  const articles: DocArticle[] = []
  for (const doc of docs) {
    if (doc.category === category) articles.push(doc)
  }
  return articles
}

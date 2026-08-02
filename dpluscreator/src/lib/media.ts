// Single source of truth for the home page showcase video URLs. Both the
// ProjectShowcase (which plays them) and the Preloader (which warms them during
// load) read from here so they can't drift apart.

export const HOME_SHOWCASE_VIDEOS = {
  reels: "https://res.cloudinary.com/dk6htc9uw/video/upload/v1770110216/VIDEO_18_1_zqff21.mp4",
  motion: "https://res.cloudinary.com/dk6htc9uw/video/upload/v1770110216/coffee_jto4nz.mp4",
  vfx: "https://res.cloudinary.com/dk6htc9uw/video/upload/v1770110220/Sequence_01_2_hl9m2u.mp4",
} as const;

// Flat list the loader preloads while the greeting plays.
export const HOME_PRELOAD_VIDEOS = Object.values(HOME_SHOWCASE_VIDEOS);

import searchStory from './search-story.js';
import tasksStory from './tasks-story.js';
import quizStory from './quiz-story.js';
import marqueeReel from './marquee-reel.js';
import signsCarousel from './signs-carousel.js';
import beforeAfterCarousel from './before-after-carousel.js';
import reviewPost from './review-post.js';
import listLinkedin from './list-linkedin.js';
import cardsLinkedin from './cards-linkedin.js';
import clientShowcase from './client-showcase.js';
import siteReview from './site-review.js';
import siteFix from './site-fix.js';
import explainerReel from './explainer-reel.js';
import aiDemo from './ai-demo.js';
import priceBreakdown from './price-breakdown.js';
import founderDiary from './founder-diary.js';
import brollText from './broll-text.js';
import screenNative from './screen-native.js';

export const templates = Object.fromEntries(
  [searchStory, tasksStory, quizStory, marqueeReel, signsCarousel, beforeAfterCarousel, reviewPost, listLinkedin, cardsLinkedin, clientShowcase, siteReview, siteFix, explainerReel, aiDemo, priceBreakdown, founderDiary, brollText, screenNative].map((t) => [t.name, t])
);

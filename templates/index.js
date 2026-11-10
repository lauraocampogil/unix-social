import searchStory from './search-story.js';
import tasksStory from './tasks-story.js';
import quizStory from './quiz-story.js';
import marqueeReel from './marquee-reel.js';
import signsCarousel from './signs-carousel.js';
import beforeAfterCarousel from './before-after-carousel.js';
import reviewPost from './review-post.js';
import listLinkedin from './list-linkedin.js';
import cardsLinkedin from './cards-linkedin.js';

export const templates = Object.fromEntries(
  [searchStory, tasksStory, quizStory, marqueeReel, signsCarousel, beforeAfterCarousel, reviewPost, listLinkedin, cardsLinkedin].map((t) => [t.name, t])
);

export type InstagramCategory = 'stories' | 'hoz-pox' | 'informative' | 'visuals';

export interface InstagramPost {
  id: string;
  category: InstagramCategory;
  url: string;
  embedUrl: string;
}

// Ensure URLs use the /embed suffix for clean iframe rendering
const createPost = (id: string, category: InstagramCategory, url: string): InstagramPost => ({
  id,
  category,
  url,
  embedUrl: url.endsWith('/') ? `${url}embed` : `${url}/embed`
});

export const instagramPosts: InstagramPost[] = [
  // STORIES
  createPost('1', 'stories', 'https://www.instagram.com/p/DLVUwpjovAT/'),
  createPost('2', 'stories', 'https://www.instagram.com/p/DLiIW3coNAg/'),
  createPost('3', 'stories', 'https://www.instagram.com/p/DYHYMx9Iu8m/'),
  
  // HOZ POX
  createPost('4', 'hoz-pox', 'https://www.instagram.com/p/C8FZhlss2o6/'),
  createPost('5', 'hoz-pox', 'https://www.instagram.com/p/DCKCD6nBdhu/'),
  createPost('6', 'hoz-pox', 'https://www.instagram.com/p/DCrw0jESQNh/'),
  
  // INFORMATIVE
  createPost('7', 'informative', 'https://www.instagram.com/p/C7HhPPyvosO/'),
  createPost('8', 'informative', 'https://www.instagram.com/p/C7Ui2sNtqYE/'),
  createPost('9', 'informative', 'https://www.instagram.com/p/C7n2QpNos4Q/'),
  
  // VISUALS
  createPost('10', 'visuals', 'https://www.instagram.com/p/C76MjH_PR2R/'),
  createPost('11', 'visuals', 'https://www.instagram.com/p/C9DIYefMoHA/'),
  createPost('12', 'visuals', 'https://www.instagram.com/p/C95OXeHqj72/'),
];

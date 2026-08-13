const urls = [
  'https://we-do-effects.vercel.app',
  'https://we-do-effects-git-main-arnav-sharma437s-projects.vercel.app'
];

async function checkDeployments() {
  for (const url of urls) {
    try {
      console.log(`Checking ${url}/api/seed?secret=seedme...`);
      const response = await fetch(`${url}/api/seed?secret=seedme`);
      const text = await response.text();
      console.log(`Status: ${response.status}`);
      if (text.startsWith('{')) {
        console.log(`Success JSON on ${url}:`, JSON.parse(text));
        return true;
      } else {
        console.log(`HTML or non-JSON returned on ${url}`);
      }
    } catch (e) {
      console.error(`Failed ${url}:`, e.message);
    }
  }
  return false;
}

async function loop() {
  for (let i = 0; i < 20; i++) {
    const found = await checkDeployments();
    if (found) break;
    console.log('Waiting 10 seconds...');
    await new Promise(r => setTimeout(r, 10000));
  }
}

loop();

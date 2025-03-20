const CDP = require('chrome-remote-interface');

async function test() {
  let client;
  try {
    // Connect to an instance of Chrome/Chromium running with --remote-debugging-port=9222
    client = await CDP();
    const { DOM, Runtime } = client;

    // Navigate to the homepage
    await Runtime.evaluate({
      expression: 'window.location.href = "http://localhost:5173/"'
    });

    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if the search button exists
    const searchExists = await Runtime.evaluate({
      expression: `
        const searchElement = document.querySelector('.VPNavBarSearch');
        if (searchElement) {
          console.log('Search button found!');
          return true;
        } else {
          console.log('Search button not found. Checking DOM structure...');
          
          // Log the navigation bar structure to help diagnose
          const navbar = document.querySelector('.VPNavBar');
          if (navbar) {
            console.log('Navbar HTML:', navbar.innerHTML);
            
            // Look for other common search button classes
            const alternativeSearch = document.querySelector('.DocSearch-Button') || 
                                     document.querySelector('.search-button') || 
                                     document.querySelector('[aria-label="Search"]');
            if (alternativeSearch) {
              console.log('Alternative search button found!', alternativeSearch.outerHTML);
              return true;
            }
          } else {
            console.log('Navbar not found!');
          }
          return false;
        }
      `
    });

    console.log('Search button exists:', searchExists.result.value);

    if (searchExists.result.value) {
      // Try clicking the search button
      await Runtime.evaluate({
        expression: `
          const searchBtn = document.querySelector('.VPNavBarSearch') || 
                          document.querySelector('.DocSearch-Button') ||
                          document.querySelector('.search-button') ||
                          document.querySelector('[aria-label="Search"]');
          if (searchBtn) {
            console.log('Clicking search button...');
            searchBtn.click();
          }
        `
      });

      // Wait for search modal to appear
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if search modal opened
      const searchModalExists = await Runtime.evaluate({
        expression: `
          const modal = document.querySelector('.VPLocalSearchBox') || 
                       document.querySelector('.DocSearch-Modal');
          if (modal) {
            console.log('Search modal opened successfully!');
            return true;
          } else {
            console.log('Search modal not opened');
            return false;
          }
        `
      });

      console.log('Search modal exists:', searchModalExists.result.value);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

test(); 
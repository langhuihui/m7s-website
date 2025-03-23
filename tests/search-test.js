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
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check if the search element exists
    const searchResult = await Runtime.evaluate({
      expression: 'document.querySelector(".VPNavBarSearch") !== null'
    });

    if (searchResult.result.value) {
      console.log('✅ Search functionality is enabled');

      // Check if clicking on search opens the search dialog
      await Runtime.evaluate({
        expression: 'document.querySelector(".VPNavBarSearch").click()'
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const searchDialogResult = await Runtime.evaluate({
        expression: 'document.querySelector(".VPLocalSearchBox") !== null'
      });

      if (searchDialogResult.result.value) {
        console.log('✅ Search dialog opens successfully');
      } else {
        console.log('❌ Search dialog does not open');
      }
    } else {
      console.log('❌ Search functionality is not enabled');
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
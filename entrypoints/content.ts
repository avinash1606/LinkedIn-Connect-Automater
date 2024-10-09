
export default defineContentScript({
  matches: ['*://www.linkedin.com/mynetwork/grow/*'],
  main() {
    console.log('LinkedIn connection automation script running.');

    // Create and style the floating button
    const createFloatingButton = () => {
      const button = document.createElement('button');
      button.innerText = 'Connect with All';
      button.style.position = 'fixed';
      button.style.bottom = '20px';
      button.style.right = '20px';
      button.style.zIndex = '9999';
      button.style.padding = '10px 20px';
      button.style.backgroundColor = '#0073b1';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '5px';
      button.style.cursor = 'pointer';
      button.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
      document.body.appendChild(button);
      return button;
    };

    const button = createFloatingButton();

    // Function to count visible "Connect" buttons
    const countConnectButtons = () => {
      const connectButtons = document.querySelectorAll('button[aria-label^="Invite"]');
      return connectButtons.length;
    };

    // Function to trigger clicks on all visible "Connect" buttons
    const connectWithAll = () => {
      const connectButtons = Array.from(document.querySelectorAll('button[aria-label^="Invite"]'));

      if (connectButtons.length === 0) {
        alert('No connectable profiles found.');
        return;
      }

      let count = 0;
      connectButtons.forEach((btn, index) => {
        const connectButton = btn as HTMLButtonElement;

        setTimeout(() => {
          connectButton.click();
          count++;
          console.log(`Connection request sent: ${count}`);
        }, index * (Math.random() * 2000 + 1000)); // Random delay between 1-3 seconds
      });

      // Alert after sending all requests
      setTimeout(() => {
        alert(`${count} connection requests sent!`);
      }, connectButtons.length * 1000); // Adjust this timeout based on your delay
    };

    // Function to handle messages from the popup
    const handleMessage = (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
      if (message.action === 'checkCount') {
        const count = countConnectButtons(); // Count buttons without scrolling
        sendResponse({ count }); // Send the count back to the popup
      } else if (message.action === 'start') {
        connectWithAll(); // Start sending connection requests
      }
    };

    // Listen for messages
    chrome.runtime.onMessage.addListener(handleMessage);

    // Add event listener to the floating button
    button.addEventListener('click', connectWithAll);
  },
});

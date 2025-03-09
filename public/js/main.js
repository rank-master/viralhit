// Check for authentication
document.addEventListener('DOMContentLoaded', () => {
    // Common functions for all pages
    
    // Check if current page is dashboard
    if (window.location.pathname === '/dashboard') {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        window.location.href = '/login';
      }
    }
  
    // Auto-logout for inactivity
    let inactivityTimeout;
    
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
          localStorage.removeItem('user');
          window.location.href = '/login?logout=inactive';
        }
      }, 30 * 60 * 1000); // 30 minutes
    };
    
    // Reset timer on user activity
    ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'].forEach(event => {
      document.addEventListener(event, resetInactivityTimer);
    });
    
    // Initialize inactivity timer
    resetInactivityTimer();
  });
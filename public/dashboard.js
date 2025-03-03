document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const pages = document.querySelectorAll('.page');
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page') + '-page';
        
        // Remove active class from all links and pages
        navLinks.forEach(l => l.parentElement.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
  
        // Add active class to clicked link and corresponding page
        link.parentElement.classList.add('active');
        document.getElementById(pageId).classList.add('active');
  
        // Close sidebar on mobile after click
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
        }
      });
    });
  
    // Sidebar Toggle
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
  
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  
    // Copy Referral Link
    const copyButton = document.getElementById('copy-link');
    const referralLink = document.getElementById('referral-link');
  
    // Set a dummy referral link for demo
    referralLink.value = 'https://9ties.com/ref/user123';
  
    copyButton.addEventListener('click', () => {
      referralLink.select();
      document.execCommand('copy');
      copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    });
  
    // Share Buttons (Basic alert for demo - integrate with real APIs as needed)
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
      button.addEventListener('click', () => {
        const platform = button.className.split(' ')[1];
        alert(`Sharing to ${platform} (Demo - Implement actual sharing API)`);
      });
    });
  
    // Withdrawal Modal
    const withdrawButton = document.getElementById('withdraw-button');
    const withdrawalModal = document.getElementById('withdrawal-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    const confirmWithdrawal = document.getElementById('confirm-withdrawal');
  
    withdrawButton.addEventListener('click', () => {
      withdrawalModal.classList.add('active');
    });
  
    modalCloseButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        withdrawalModal.classList.remove('active');
      });
    });
  
    confirmWithdrawal.addEventListener('click', () => {
      const amount = document.getElementById('withdrawal-amount').value;
      alert(`Withdrawal request for ₹${amount} submitted (Demo)`);
      withdrawalModal.classList.remove('active');
    });
  
    // Expandable Referral Rows
    const expandableRows = document.querySelectorAll('.expandable-row');
    expandableRows.forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        const expandedContent = document.querySelector(`.expanded-content[data-parent="${id}"]`);
        expandedContent.classList.toggle('active');
      });
    });
  
    // Commission Sliders
    const firstSaleSlider = document.getElementById('first-sale-commission');
    const firstSaleValue = document.getElementById('first-sale-value');
    const firstSaleReferral = document.getElementById('first-sale-referral');
    const firstSalePassive = document.getElementById('first-sale-passive');
  
    const subsequentSaleSlider = document.getElementById('subsequent-sale-commission');
    const subsequentSaleValue = document.getElementById('subsequent-sale-value');
    const subsequentSaleReferral = document.getElementById('subsequent-sale-referral');
    const subsequentSalePassive = document.getElementById('subsequent-sale-passive');
  
    function updateFirstSaleCommission() {
      const value = firstSaleSlider.value;
      firstSaleValue.textContent = value;
      firstSaleReferral.textContent = 90 - value; // Total 90% split (80% max + 10% min referral)
      firstSalePassive.textContent = 5; // Fixed passive for demo
    }
  
    function updateSubsequentSaleCommission() {
      const value = subsequentSaleSlider.value;
      subsequentSaleValue.textContent = value;
      subsequentSaleReferral.textContent = 80 - value; // Total 80% split (60% max + 20% min referral)
      subsequentSalePassive.textContent = 10; // Fixed passive for demo
    }
  
    firstSaleSlider.addEventListener('input', updateFirstSaleCommission);
    subsequentSaleSlider.addEventListener('input', updateSubsequentSaleCommission);
  
    // Initial updates
    updateFirstSaleCommission();
    updateSubsequentSaleCommission();
  
    // Basic Form Submission Handlers (Demo)
    document.getElementById('save-commission-settings').addEventListener('click', () => {
      alert('Commission settings saved (Demo)');
    });
  
    document.getElementById('save-payment-settings').addEventListener('click', () => {
      alert('Payment settings saved (Demo)');
    });
  
    document.getElementById('save-profile').addEventListener('click', () => {
      alert('Profile saved (Demo)');
    });
  
    document.getElementById('change-password').addEventListener('click', () => {
      alert('Password changed (Demo)');
    });
  });
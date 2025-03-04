// public/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  // Security: Check authentication
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/auth.html';
    return;
  }

  // Fetch dashboard data from /api/user/dashboard
  async function fetchDashboardData() {
    try {
      const response = await fetch('/api/user/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        // Populate user info
        document.getElementById('user-name').textContent = data.name || 'User';
        document.getElementById('profile-name').textContent = data.name || 'Loading...';
        document.getElementById('profile-email').textContent = data.email || 'Loading...';
        document.getElementById('profile-name-input').value = data.name || '';
        document.getElementById('profile-email-input').value = data.email || '';
        document.getElementById('profile-phone').value = data.phone || '';

        // Dashboard stats (use balance for now, update as API expands)
        document.getElementById('total-earnings').textContent = (data.balance || 0).toFixed(2);
        document.getElementById('total-referrals').textContent = data.totalReferrals || 0;
        document.getElementById('month-earnings').textContent = (data.monthEarnings || 0).toFixed(2);
        document.getElementById('network-size').textContent = data.networkSize || 0;
        document.getElementById('referral-link').value = data.referralLink || 'https://9ties.com/ref/user123';

        // Earnings page
        document.getElementById('available-balance').textContent = (data.balance || 0).toFixed(2);
        document.getElementById('direct-commissions').textContent = (data.directCommissions || 0).toFixed(2);
        document.getElementById('indirect-commissions').textContent = (data.indirectCommissions || 0).toFixed(2);
        document.getElementById('super-passive').textContent = (data.superPassive || 0).toFixed(2);
        document.getElementById('modal-balance').textContent = (data.balance || 0).toFixed(2);

        // Referrals page
        document.getElementById('direct-referrals').textContent = data.directReferrals || 0;
        document.getElementById('indirect-referrals').textContent = data.indirectReferrals || 0;
        document.getElementById('conversion-rate').textContent = data.conversionRate || 0;

        // Optional: Dynamic referral table (if API provides directReferralsList later)
        if (data.directReferralsList) {
          const tbody = document.getElementById('direct-referrals-body');
          tbody.innerHTML = '';
          data.directReferralsList.forEach((ref, index) => {
            const row = `
              <tr class="expandable-row" data-id="${index + 1}">
                <td>${ref.name}</td>
                <td>${ref.joined}</td>
                <td>${ref.package}</td>
                <td>${ref.theirReferrals}</td>
                <td>₹${ref.earningsGenerated.toFixed(2)}</td>
              </tr>
              <tr class="expanded-content" data-parent="${index + 1}">
                <td colspan="5">
                  <div class="nested-referrals">
                    <h4>${ref.name}'s Referrals:</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Joined</th>
                          <th>Package</th>
                          <th>Earnings For You</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${ref.subReferrals.map(sub => `
                          <tr>
                            <td>${sub.name}</td>
                            <td>${sub.joined}</td>
                            <td>${sub.package}</td>
                            <td>₹${sub.earningsForYou.toFixed(2)}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            `;
            tbody.insertAdjacentHTML('beforeend', row);
          });
        }
      } else {
        logout();
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      logout();
    }
  }

  // Sidebar Navigation
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page') + '-page';
      
      navLinks.forEach(l => l.parentElement.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      link.parentElement.classList.add('active');
      document.getElementById(pageId).classList.add('active');

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

  copyButton.addEventListener('click', () => {
    referralLink.select();
    document.execCommand('copy');
    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
    }, 2000);
  });

  // Share Buttons
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
    firstSaleReferral.textContent = 90 - value;
    firstSalePassive.textContent = 5;
  }

  function updateSubsequentSaleCommission() {
    const value = subsequentSaleSlider.value;
    subsequentSaleValue.textContent = value;
    subsequentSaleReferral.textContent = 80 - value;
    subsequentSalePassive.textContent = 10;
  }

  firstSaleSlider.addEventListener('input', updateFirstSaleCommission);
  subsequentSaleSlider.addEventListener('input', updateSubsequentSaleCommission);

  updateFirstSaleCommission();
  updateSubsequentSaleCommission();

  // Form Submission Handlers
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

  // Logout Functionality
  document.getElementById('logout-button').addEventListener('click', logout);
  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/auth.html';
  }

  // Fetch data on load
  fetchDashboardData();
});